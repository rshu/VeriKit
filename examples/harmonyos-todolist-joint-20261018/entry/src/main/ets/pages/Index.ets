import { preferences } from '@kit.ArkData';
import { BusinessError } from '@kit.BasicServicesKit';
import { TodoItem, TodoFilter, TodoModel } from '../model/TodoModel';

const STORE_NAME = 'todoStore';
const KEY_TODOS = 'todos';

@Entry
@Component
struct Index {
  @State items: TodoItem[] = [];
  // 统计值必须由 @State 驱动：[总数, 未完成, 已完成]
  @State stats: number[] = [0, 0, 0];
  @State filter: TodoFilter = 'all';
  @State inputText: string = '';
  @State loaded: boolean = false;
  @State loadError: string = '';
  @State saveError: string = '';

  private model: TodoModel = new TodoModel();
  private store: preferences.Preferences | null = null;
  // 仅在成功读取存储后为 true；未成功读取时不允许以空列表覆盖保存。
  private storeReady: boolean = false;
  // 保存链：串行执行 put+flush，避免并发保存相互覆盖。
  private saveChain: Promise<void> = Promise.resolve();

  aboutToAppear(): void {
    this.loadFromStore();
  }

  private async loadFromStore(): Promise<void> {
    try {
      const options: preferences.Options = { name: STORE_NAME };
      const store = await preferences.getPreferences(getContext(this), options);
      const saved = store.getSync(KEY_TODOS, '') as string;
      // 读取成功后才接管 store，失败时保留已知数据且不覆盖保存。
      this.store = store;
      this.storeReady = true;
      this.model.restore(saved);
      this.loadError = '';
    } catch (e) {
      const err = e as BusinessError;
      // 读取失败：保留当前内存数据，明确显示错误；不把空列表当成功覆盖存储。
      this.storeReady = false;
      this.loadError = `数据加载失败(Code:${err.code})，显示的是未持久化的数据`;
    } finally {
      this.refreshItems();
      this.loaded = true;
    }
  }

  // 变更后持久化：put 后 await flush；保存失败显示错误，不静默伪装成功。
  private persist(): void {
    const data = this.model.serialize();
    this.saveChain = this.saveChain.then(async (): Promise<void> => {
      if (this.store === null || !this.storeReady) {
        this.saveError = '存储不可用，本次变更未能保存';
        return;
      }
      try {
        this.store.putSync(KEY_TODOS, data);
        await this.store.flush();
        this.saveError = '';
      } catch (e) {
        const err = e as BusinessError;
        this.saveError = `保存失败(Code:${err.code})，请重试`;
      }
    });
  }

  // 刷新：为每条生成新对象副本，保证 ForEach 子项随内容变化重建。
  private refreshItems(): void {
    const visible = this.model.visible(this.filter);
    const copies: TodoItem[] = [];
    for (let i = 0; i < visible.length; i++) {
      copies.push({ id: visible[i].id, title: visible[i].title, completed: visible[i].completed });
    }
    this.items = copies;
    let active = 0;
    let completed = 0;
    const all = this.model.items;
    for (let i = 0; i < all.length; i++) {
      if (all[i].completed) {
        completed++;
      } else {
        active++;
      }
    }
    this.stats = [all.length, active, completed];
  }

  private applyFilter(filter: TodoFilter): void {
    this.filter = filter;
    this.refreshItems();
  }

  private handleAdd(): void {
    if (!this.loaded) {
      return;
    }
    if (this.model.add(this.inputText)) {
      this.inputText = '';
      this.refreshItems();
      this.persist();
    }
  }

  private handleToggle(id: string): void {
    this.model.toggle(id);
    this.refreshItems();
    this.persist();
  }

  private handleRemove(id: string): void {
    this.model.remove(id);
    this.refreshItems();
    this.persist();
  }

  build() {
    Column() {
      Text('Todo List')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 16, bottom: 12 })

      if (!this.loaded) {
        Column() {
          LoadingProgress()
            .width(40)
            .height(40)
          Text('加载中...')
            .fontSize(14)
            .margin({ top: 8 })
        }
        .width('100%')
        .layoutWeight(1)
        .justifyContent(FlexAlign.Center)
      } else {
        Row() {
          TextInput({ text: this.inputText, placeholder: '输入待办事项' })
            .id('todo-input')
            .layoutWeight(1)
            .maxLength(120)
            .onChange((value: string) => {
              this.inputText = value;
            })
            .onSubmit(() => {
              this.handleAdd();
            })
          Button('添加')
            .id('add-button')
            .margin({ left: 8 })
            .onClick(() => {
              this.handleAdd();
            })
        }
        .width('100%')
        .padding({ left: 16, right: 16 })

        Row({ space: 8 }) {
          Button('全部')
            .id('filter-all')
            .backgroundColor(this.filter === 'all' ? Color.Blue : Color.Gray)
            .onClick(() => {
              this.applyFilter('all');
            })
          Button('未完成')
            .id('filter-active')
            .backgroundColor(this.filter === 'active' ? Color.Blue : Color.Gray)
            .onClick(() => {
              this.applyFilter('active');
            })
          Button('已完成')
            .id('filter-completed')
            .backgroundColor(this.filter === 'completed' ? Color.Blue : Color.Gray)
            .onClick(() => {
              this.applyFilter('completed');
            })
        }
        .width('100%')
        .padding({ left: 16, right: 16, top: 8 })

        // 统计值读取 @State stats，随 refreshItems 即时刷新。
        Text(`共 ${this.stats[0]} 项，未完成 ${this.stats[1]} 项，已完成 ${this.stats[2]} 项`)
          .fontSize(13)
          .fontColor(Color.Gray)
          .margin({ top: 8, bottom: 4 })

        if (this.loadError !== '') {
          Text(this.loadError)
            .fontSize(13)
            .fontColor(Color.Orange)
            .margin({ left: 16, right: 16 })
        }

        if (this.saveError !== '') {
          Text(this.saveError)
            .fontSize(13)
            .fontColor(Color.Red)
            .margin({ left: 16, right: 16 })
        }

        List() {
          // key 包含完成状态：内容变化时 key 变化，强制 ForEach 重建子项刷新 UI。
          ForEach(this.items, (item: TodoItem) => {
            ListItem() {
              Row() {
                Text(item.completed ? '✓' : '○')
                  .id(`toggle-${item.id}`)
                  .fontSize(20)
                  .margin({ right: 12 })
                  .onClick(() => {
                    this.handleToggle(item.id);
                  })
                Text(item.title)
                  .fontSize(16)
                  .decoration({ type: item.completed ? TextDecorationType.LineThrough : TextDecorationType.None })
                  .layoutWeight(1)
                  .maxLines(2)
                Text('删除')
                  .id(`delete-${item.id}`)
                  .fontSize(14)
                  .fontColor(Color.Red)
                  .margin({ left: 8 })
                  .onClick(() => {
                    this.handleRemove(item.id);
                  })
              }
              .id(`todo-row-${item.id}`)
              .width('100%')
              .padding({ left: 16, right: 16, top: 10, bottom: 10 })
            }
          }, (item: TodoItem) => `${item.id}#${item.completed ? 'done' : 'undone'}`)
        }
        .width('100%')
        .layoutWeight(1)
      }
    }
    .width('100%')
    .height('100%')
  }
}
