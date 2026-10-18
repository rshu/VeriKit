/**
 * 单页面 TodoList：@State 驱动刷新，加载完成前保持 loading。
 * 稳定测试 id：todo-input / add-button / filter-all / filter-active /
 * filter-completed / todo-row-<id> / toggle-<id> / delete-<id>
 */
import { TodoItem, TodoFilter, TodoModel } from '../model/TodoModel';
import { TodoStore } from '../model/TodoStore';

@Entry
@Component
struct Index {
  @State items: TodoItem[] = [];
  @State filter: TodoFilter = 'all';
  @State loading: boolean = true;
  @State saveError: string = '';
  @State loadError: string = '';
  @State inputInvalid: boolean = false;
  @State inputText: string = '';
  @State totalCount: number = 0;
  @State remainingTodoCount: number = 0;
  private model: TodoModel = new TodoModel();
  private store: TodoStore = new TodoStore();
  /** 只有成功完成 init + load 后才为 true；此前禁止新增与任何保存写入。 */
  private loadSucceeded: boolean = false;

  aboutToAppear(): void {
    this.init();
  }

  private async init(): Promise<void> {
    try {
      await this.store.init(getContext(this));
      const json: string = await this.store.load();
      if (json.length > 0) {
        this.model.restore(json);
      }
      this.loadSucceeded = true;
      this.loadError = '';
    } catch (err) {
      // 初始化或读取失败：不 restore、不写入；显示可见错误并禁用新增，
      // 避免读失败后用空列表覆盖既有数据。
      this.loadSucceeded = false;
      this.loadError = '数据加载失败，为保护已有数据已暂停新增与保存';
    }
    this.loading = false;
    this.refresh();
  }

  /** 同步 @State 快照与统计，随后触发保存。 */
  private refresh(): void {
    this.items = this.model.visible(this.filter);
    this.totalCount = this.model.items.length;
    let active: number = 0;
    for (let i = 0; i < this.model.items.length; i++) {
      if (!this.model.items[i].completed) {
        active++;
      }
    }
    this.remainingTodoCount = active;
  }

  private persist(): void {
    if (!this.loadSucceeded) {
      return;
    }
    this.store.save(this.model.serialize()).then((ok: boolean) => {
      this.saveError = ok ? '' : '保存失败，数据可能未落盘';
    });
  }

  private onAdd(): void {
    if (this.loading || !this.loadSucceeded) {
      return;
    }
    if (!this.model.add(this.inputText)) {
      this.inputInvalid = true;
      return;
    }
    this.inputInvalid = false;
    this.inputText = '';
    this.refresh();
    this.persist();
  }

  private onToggle(id: string): void {
    this.model.toggle(id);
    this.refresh();
    this.persist();
  }

  private onRemove(id: string): void {
    this.model.remove(id);
    this.refresh();
    this.persist();
  }

  private setFilter(filter: TodoFilter): void {
    this.filter = filter;
    this.refresh();
  }

  @Builder
  filterButton(label: string, target: TodoFilter, testId: string) {
    Button(label)
      .id(testId)
      .fontSize(14)
      .backgroundColor(this.filter === target ? '#007DFF' : '#E5E5E5')
      .fontColor(this.filter === target ? '#FFFFFF' : '#182431')
      .onClick(() => {
        this.setFilter(target);
      })
  }

  build() {
    Column() {
      if (this.loading) {
        Text('加载中...')
          .id('todo-loading')
          .fontSize(18)
          .margin({ top: 120 })
      } else {
        Text('待办清单')
          .fontSize(22)
          .fontWeight(FontWeight.Bold)
          .margin({ top: 16, bottom: 12 })

        Row({ space: 8 }) {
          TextInput({ text: this.inputText, placeholder: '输入待办标题（不超过80字符）' })
            .id('todo-input')
            .layoutWeight(1)
            .onChange((value: string) => {
              this.inputText = value;
            })
            .onSubmit(() => {
              this.onAdd();
            })

          Button('添加')
            .id('add-button')
            .onClick(() => {
              this.onAdd();
            })
        }
        .width('100%')
        .padding({ left: 16, right: 16 })

        if (this.inputInvalid) {
          Text('标题不能为空白，且 trim 后不超过 80 个字符')
            .fontSize(12)
            .fontColor('#E84026')
            .margin({ top: 4 })
        }

        if (this.saveError.length > 0) {
          Text(this.saveError)
            .fontSize(12)
            .fontColor('#E84026')
            .margin({ top: 4 })
        }

        if (this.loadError.length > 0) {
          Text(this.loadError)
            .id('todo-load-error')
            .fontSize(12)
            .fontColor('#E84026')
            .margin({ top: 4 })
        }

        Row({ space: 8 }) {
          this.filterButton('全部', 'all', 'filter-all')
          this.filterButton('未完成', 'active', 'filter-active')
          this.filterButton('已完成', 'completed', 'filter-completed')
        }
        .width('100%')
        .padding({ left: 16, right: 16, top: 10 })

        Text(`共 ${this.totalCount} 条，未完成 ${this.remainingTodoCount} 条`)
          .fontSize(13)
          .fontColor('#666666')
          .margin({ top: 8, bottom: 4 })

        List() {
          ForEach(this.items, (item: TodoItem) => {
            ListItem() {
              Row({ space: 10 }) {
                Checkbox()
                  .id('toggle-' + item.id)
                  .select(item.completed)
                  .onChange(() => {
                    this.onToggle(item.id);
                  })

                Text(item.title)
                  .fontSize(16)
                  .decoration({
                    type: item.completed ? TextDecorationType.LineThrough : TextDecorationType.None
                  })
                  .layoutWeight(1)
                  .maxLines(2)

                Button('删除')
                  .id('delete-' + item.id)
                  .fontSize(13)
                  .backgroundColor('#F1F3F5')
                  .fontColor('#E84026')
                  .onClick(() => {
                    this.onRemove(item.id);
                  })
              }
              .width('100%')
              .padding({ left: 16, right: 16, top: 8, bottom: 8 })
            }
            .id('todo-row-' + item.id)
          }, (item: TodoItem) => item.id)
        }
        .width('100%')
        .layoutWeight(1)
        .alignListItem(ListItemAlign.Start)
      }
    }
    .width('100%')
    .height('100%')
  }
}
