// Index.ets — 单页面 TodoList UI。加载 Preferences 前保持 loading，加载完成后方可新增。

import { common } from '@kit.AbilityKit';
import { TodoModel, TodoFilter, TodoItem } from '../model/TodoModel';
import { TodoStorage } from '../model/TodoStorage';

@Entry
@Component
struct Index {
  @State items: TodoItem[] = [];
  @State inputText: string = '';
  @State filter: TodoFilter = 'all';
  @State loading: boolean = true;
  @State saveError: string = '';
  @State totalCount: number = 0;
  @State pendingCount: number = 0;
  @State doneCount: number = 0;
  @State loadFailed: boolean = false;
  private model: TodoModel = new TodoModel();
  private storage: TodoStorage = new TodoStorage();

  onPageShow(): void {
    this.refresh();
  }

  async aboutToAppear(): Promise<void> {
    await this.loadFromStorage();
  }

  private async loadFromStorage(): Promise<void> {
    this.loadFailed = false;
    this.saveError = '';
    try {
      const context = getContext(this) as common.UIAbilityContext;
      await this.storage.init(context);
      const json = await this.storage.load();
      this.model.restore(json);
      // 读取成功后才允许新增，避免覆盖未知旧数据。
      this.loading = false;
    } catch (e) {
      // 读取失败：显示错误、阻止新增，保留旧存储数据，允许重试。
      this.loadFailed = true;
      this.saveError = TodoStorage.formatError(e as Error);
      this.loading = false;
    }
    this.refresh();
  }

  private async onRetryLoad(): Promise<void> {
    this.loading = true;
    this.refresh();
    await this.loadFromStorage();
  }

  private refresh(): void {
    // 重建数组以触发 @State 刷新。
    this.items = this.model.visible(this.filter).slice();
    this.totalCount = this.model.countOf('all');
    this.pendingCount = this.model.countOf('active');
    this.doneCount = this.model.countOf('completed');
  }

  private async persist(): Promise<void> {
    try {
      await this.storage.save(this.model.serialize());
      this.saveError = '';
    } catch (e) {
      this.saveError = TodoStorage.formatError(e as Error);
    }
  }

  private async onAdd(): Promise<void> {
    if (this.loading || this.loadFailed) {
      return;
    }
    if (!this.model.add(this.inputText)) {
      return;
    }
    this.inputText = '';
    this.refresh();
    await this.persist();
  }

  private async onToggle(id: string): Promise<void> {
    this.model.toggle(id);
    this.refresh();
    await this.persist();
  }

  private async onDelete(id: string): Promise<void> {
    this.model.remove(id);
    this.refresh();
    await this.persist();
  }

  private onFilterChange(filter: TodoFilter): void {
    this.filter = filter;
    this.refresh();
  }

  @Builder
  filterButton(label: string, target: TodoFilter, testId: string) {
    Text(label)
      .id(testId)
      .fontSize(16)
      .fontColor(this.filter === target ? '#007DFF' : '#666666')
      .fontWeight(this.filter === target ? FontWeight.Bold : FontWeight.Normal)
      .padding({ left: 12, right: 12, top: 6, bottom: 6 })
      .backgroundColor(this.filter === target ? '#E6F2FF' : '#F1F3F5')
      .borderRadius(16)
      .margin({ right: 8 })
      .onClick(() => this.onFilterChange(target));
  }

  build() {
    Column() {
      Text('待办事项')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 16, bottom: 8 })

      if (this.loading) {
        Column() {
          LoadingProgress()
            .width(48)
            .height(48)
          Text('加载中…')
            .fontSize(16)
            .margin({ top: 12 })
        }
        .justifyContent(FlexAlign.Center)
        .layoutWeight(1)
      } else {
        // 输入区
        Row() {
          TextInput({ placeholder: '输入待办（1-80字）', text: this.inputText })
            .id('todo-input')
            .layoutWeight(1)
            .maxLength(80)
            .onChange((value: string) => {
              this.inputText = value;
            })
            .onSubmit(() => {
              this.onAdd();
            })
          Button('添加')
            .id('add-button')
            .margin({ left: 8 })
            .onClick(() => {
              this.onAdd();
            })
        }
        .width('100%')
        .padding({ left: 16, right: 16 })

        // 统计与筛选区
        Row() {
          Text(`共 ${this.totalCount} 项 · 未完成 ${this.pendingCount} · 已完成 ${this.doneCount}`)
            .fontSize(14)
            .fontColor('#888888')
            .layoutWeight(1)
        }
        .width('100%')
        .padding({ left: 16, right: 16, top: 8 })

        Row() {
          this.filterButton('全部', 'all', 'filter-all')
          this.filterButton('未完成', 'active', 'filter-active')
          this.filterButton('已完成', 'completed', 'filter-completed')
        }
        .width('100%')
        .padding({ left: 16, right: 16, top: 8 })

        if (this.saveError !== '') {
          Text(this.saveError)
            .id('save-error')
            .fontSize(14)
            .fontColor('#E5484D')
            .width('100%')
            .padding({ left: 16, right: 16, top: 4 })
        }

        // 列表区
        if (this.loadFailed) {
          Column() {
            Text('数据读取失败，为避免覆盖旧数据已禁止新增')
              .id('load-error')
              .fontSize(16)
              .fontColor('#E5484D')
              .textAlign(TextAlign.Center)
              .margin({ bottom: 12 })
            Button('重试')
              .id('retry-button')
              .onClick(() => {
                this.onRetryLoad();
              })
          }
          .justifyContent(FlexAlign.Center)
          .layoutWeight(1)
          .width('100%')
        } else if (this.items.length === 0) {
          Column() {
            Text('暂无待办')
              .fontSize(16)
              .fontColor('#999999')
          }
          .justifyContent(FlexAlign.Center)
          .layoutWeight(1)
          .width('100%')
        } else {
          List() {
            ForEach(this.items, (item: TodoItem) => {
              ListItem() {
                Row() {
                  Toggle({ type: ToggleType.Checkbox, isOn: item.completed })
                    .id(`toggle-${item.id}`)
                    .onChange(() => {
                      this.onToggle(item.id);
                    })
                  Text(item.title)
                    .fontSize(16)
                    .layoutWeight(1)
                    .margin({ left: 12 })
                    .decoration({
                      type: item.completed ? TextDecorationType.LineThrough : TextDecorationType.None,
                      color: '#999999'
                    })
                    .fontColor(item.completed ? '#999999' : '#000000')
                  Button('删除')
                    .id(`delete-${item.id}`)
                    .backgroundColor('#FFF0F0')
                    .fontColor('#E5484D')
                    .onClick(() => {
                      this.onDelete(item.id);
                    })
                }
                .id(`todo-row-${item.id}`)
                .width('100%')
                .padding({ left: 16, right: 16, top: 8, bottom: 8 })
              }
            }, (item: TodoItem) => `${item.id}#${item.completed}`)
          }
          .layoutWeight(1)
          .width('100%')
          .padding({ top: 8 })
        }
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
  }
}
