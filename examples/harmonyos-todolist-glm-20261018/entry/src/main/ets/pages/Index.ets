import { TodoModel, TodoItem, TodoFilter } from '../model/TodoModel';
import { TodoStore, toErrorMessage } from '../model/TodoStore';
import { common } from '@kit.AbilityKit';

@Entry
@Component
struct Index {
  @State loading: boolean = true;
  @State loadFailed: boolean = false;
  @State inputText: string = '';
  @State filter: TodoFilter = 'all';
  @State errorMsg: string = '';
  @State revision: number = 0; // 模型数组变更后自增，触发 UI 刷新
  private model: TodoModel = new TodoModel();
  private store: TodoStore = new TodoStore();

  aboutToAppear(): void {
    this.initAsync();
  }

  private async initAsync(): Promise<void> {
    this.loading = true;
    this.loadFailed = false;
    try {
      const context = getContext(this) as common.UIAbilityContext;
      await this.store.init(context);
      const json = await this.store.load();
      this.model.restore(json);
      this.errorMsg = '';
      this.loadFailed = false;
    } catch (err) {
      // 读取失败时保留失败状态：阻止新增/完成/删除，避免后续保存覆盖原有待办。
      this.errorMsg = `读取已保存待办失败：${toErrorMessage(err)}`;
      this.loadFailed = true;
    } finally {
      this.loading = false;
      this.revision += 1;
    }
  }

  private async persist(): Promise<void> {
    try {
      await this.store.save(this.model.serialize());
      this.errorMsg = '';
    } catch (err) {
      this.errorMsg = `保存失败：${toErrorMessage(err)}`;
    }
    this.revision += 1;
  }

  private onAdd(): void {
    if (this.loading || this.loadFailed) {
      return;
    }
    if (!this.model.add(this.inputText)) {
      this.errorMsg = '标题无效：不能为空，且 trim 后最多 80 个字符';
      this.revision += 1;
      return;
    }
    this.inputText = '';
    this.persist();
  }

  private onToggle(id: string): void {
    if (this.loading || this.loadFailed) {
      return;
    }
    this.model.toggle(id);
    this.persist();
  }

  private onRemove(id: string): void {
    if (this.loading || this.loadFailed) {
      return;
    }
    this.model.remove(id);
    this.persist();
  }

  // revision 参与 @State 刷新：模型数组本身不可观测，计数与列表都要依赖它才能随增删改同步刷新。
  private countActive(): number {
    this.revision;
    return this.model.items.filter((item: TodoItem): boolean => !item.completed).length;
  }

  private countCompleted(): number {
    this.revision;
    return this.model.items.length - this.countActive();
  }

  build() {
    Column() {
      Text('待办事项')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 16, bottom: 8 })

      if (this.loading) {
        Column() {
          LoadingProgress().width(48).height(48)
          Text('正在读取已保存的待办…').margin({ top: 12 })
        }
        .justifyContent(FlexAlign.Center)
        .layoutWeight(1)
      } else if (this.loadFailed) {
        Column() {
          Text(this.errorMsg)
            .fontSize(14)
            .fontColor(Color.Red)
            .textAlign(TextAlign.Center)
            .margin({ bottom: 12 })
          Button('重试')
            .id('retry-button')
            .onClick((): void => {
              this.initAsync();
            })
        }
        .justifyContent(FlexAlign.Center)
        .layoutWeight(1)
      } else {
        Row() {
          TextInput({ text: this.inputText, placeholder: '输入待办标题（最多80字符）' })
            .id('todo-input')
            .layoutWeight(1)
            .onChange((value: string) => {
              this.inputText = value;
            })
            .onSubmit((): void => this.onAdd())
          Button('添加')
            .id('add-button')
            .margin({ left: 8 })
            .onClick((): void => this.onAdd())
        }
        .width('100%')
        .padding({ left: 16, right: 16 })

        if (this.errorMsg.length > 0) {
          Text(this.errorMsg)
            .fontSize(13)
            .fontColor(Color.Red)
            .margin({ top: 6, left: 16, right: 16 })
        }

        Row() {
          Button('全部')
            .id('filter-all')
            .backgroundColor(this.filter === 'all' ? '#007DFF' : '#E5E5E5')
            .fontColor(this.filter === 'all' ? Color.White : Color.Black)
            .onClick((): void => {
              this.filter = 'all';
              this.revision += 1;
            })
          Button(`未完成 ${this.countActive()}`)
            .id('filter-active')
            .margin({ left: 8 })
            .backgroundColor(this.filter === 'active' ? '#007DFF' : '#E5E5E5')
            .fontColor(this.filter === 'active' ? Color.White : Color.Black)
            .onClick((): void => {
              this.filter = 'active';
              this.revision += 1;
            })
          Button(`已完成 ${this.countCompleted()}`)
            .id('filter-completed')
            .margin({ left: 8 })
            .backgroundColor(this.filter === 'completed' ? '#007DFF' : '#E5E5E5')
            .fontColor(this.filter === 'completed' ? Color.White : Color.Black)
            .onClick((): void => {
              this.filter = 'completed';
              this.revision += 1;
            })
        }
        .width('100%')
        .padding({ left: 16, right: 16, top: 10 })

        List() {
          ForEach(this.visibleRows(), (item: TodoItem) => {
            ListItem() {
              Row() {
                Checkbox()
                  .id(`toggle-${item.id}`)
                  .select(item.completed)
                  .onChange((): void => this.onToggle(item.id))
                Text(item.title)
                  .fontSize(16)
                  .layoutWeight(1)
                  .decoration({
                    type: item.completed ? TextDecorationType.LineThrough : TextDecorationType.None
                  })
                  .opacity(item.completed ? 0.5 : 1)
                Button('删除')
                  .id(`delete-${item.id}`)
                  .backgroundColor('#FF4D4F')
                  .onClick((): void => this.onRemove(item.id))
              }
              .id(`todo-row-${item.id}`)
              .width('100%')
              .padding({ left: 8, right: 8, top: 6, bottom: 6 })
            }
          }, (item: TodoItem): string => `${item.id}-${item.completed}-${this.revision}`)
        }
        .layoutWeight(1)
        .width('100%')
        .padding({ left: 16, right: 16, top: 8 })
      }
    }
    .width('100%')
    .height('100%')
    .alignItems(HorizontalAlign.Center)
  }

  // revision 参与 @State 刷新：模型数组本身不可观测，用 revision 派生可见列表。
  private visibleRows(): TodoItem[] {
    this.revision;
    return this.model.visible(this.filter);
  }
}
