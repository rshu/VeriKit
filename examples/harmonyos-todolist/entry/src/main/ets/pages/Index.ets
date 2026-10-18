import { common } from '@kit.AbilityKit';
import { TodoModel, TodoItem, TodoFilter } from '../model/TodoModel';
import { TodoStorage } from '../storage/TodoStorage';

@Entry
@Component
struct Index {
  @State private items: TodoItem[] = [];
  @State private draft: string = '';
  @State private filter: TodoFilter = 'all';
  @State private loading: boolean = true;
  @State private ready: boolean = false;
  @State private pending: number = 0;
  @State private error: string = '';
  private model: TodoModel = new TodoModel();
  private storage: TodoStorage = new TodoStorage();
  aboutToAppear(): void { this.load(); }
  private async load(): Promise<void> {
    this.loading = true;
    this.error = '';
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      this.model.restore(await this.storage.open(context));
      this.items = this.model.items.slice();
      this.ready = true;
    } catch (error) {
      this.ready = false;
      this.error = '读取失败，请点击重试。';
    } finally { this.loading = false; }
  }
  private async persist(): Promise<void> {
    this.pending++;
    this.error = '';
    const snapshot = this.model.serialize();
    try { await this.storage.save(snapshot); }
    catch (error) { this.error = '保存失败，当前更改尚未确认落盘，请重试保存。'; }
    finally { this.pending--; }
  }
  private add(): void {
    if (!this.ready || this.loading) return;
    if (!this.model.add(this.draft)) { this.error = '请输入 1 至 80 个字符。'; return; }
    this.draft = '';
    this.items = this.model.items.slice();
    this.persist();
  }
  private toggle(id: string): void {
    this.model.toggle(id);
    this.items = this.model.items.slice();
    this.persist();
  }
  private remove(id: string): void {
    this.model.remove(id);
    this.items = this.model.items.slice();
    this.persist();
  }
  private shown(): TodoItem[] {
    return this.items.filter((item: TodoItem): boolean => this.filter === 'all' || (this.filter === 'completed' ? item.completed : !item.completed));
  }
  @Builder
  filterButton(label: string, value: TodoFilter) {
    Button(label).id(`filter-${value}`).fontSize(14).height(36).layoutWeight(1)
      .backgroundColor(this.filter === value ? '#187E73' : '#E7EEEC')
      .fontColor(this.filter === value ? '#FFFFFF' : '#35534F')
      .onClick(() => { this.filter = value; })
  }
  build() {
    Column({ space: 16 }) {
      Column({ space: 6 }) {
        Text('今日待办').fontSize(30).fontWeight(FontWeight.Bold).fontColor('#183A34')
        Text('把重要的小事，安心留在这里。').fontSize(14).fontColor('#70827D')
      }.width('100%').alignItems(HorizontalAlign.Start).padding({ top: 20 })
      Row({ space: 10 }) {
        TextInput({ text: this.draft, placeholder: '添加一件待办事项' })
          .id('todo-input').layoutWeight(1).height(48).maxLength(80)
          .backgroundColor('#FFFFFF').borderRadius(12).enabled(this.ready && !this.loading)
          .onChange((value: string) => { this.draft = value; }).onSubmit(() => this.add())
        Button('添加').id('add-button').height(48).backgroundColor('#187E73')
          .enabled(this.ready && !this.loading).onClick(() => this.add())
      }.width('100%')
      Row({ space: 8 }) {
        this.filterButton('全部', 'all')
        this.filterButton('未完成', 'active')
        this.filterButton('已完成', 'completed')
      }.width('100%')
      Row() {
        Text(`共 ${this.items.length} 项 · 剩余 ${this.items.filter((item: TodoItem): boolean => !item.completed).length} 项`)
          .id('todo-count').fontSize(13).fontColor('#70827D').layoutWeight(1)
        Text(this.loading ? '正在读取…' : this.pending > 0 ? '保存中…' : this.error !== '' ? '请检查错误' : '已保存到本机')
          .id('save-status').fontSize(12).fontColor('#70827D')
      }.width('100%')
      if (this.error !== '') {
        Column({ space: 8 }) {
          Text(this.error).id('error-message').fontSize(13).fontColor('#B53F38')
          Button(this.ready ? '重试保存' : '重试读取').id('retry-button')
            .onClick(() => { if (this.ready) this.persist(); else this.load(); })
        }.width('100%')
      }
      if (!this.loading && this.shown().length === 0) {
        Column({ space: 10 }) {
          Text(this.filter === 'completed' ? '还没有已完成的待办' : '这里暂时没有待办').fontSize(18).fontColor('#617D75')
          Text('从上方添加第一件小事吧。').fontSize(13).fontColor('#8C9D97')
        }.padding({ top: 48, bottom: 24 }).width('100%')
      }
      List({ space: 10 }) {
        ForEach(this.shown(), (item: TodoItem) => {
          ListItem() {
            Row({ space: 12 }) {
              Checkbox({ name: item.id }).id(`toggle-${item.id}`).select(item.completed).selectedColor('#187E73')
                .onChange((selected: boolean) => { if (selected !== item.completed) this.toggle(item.id); })
              Text(item.title).id(`title-${item.id}`).fontSize(17).layoutWeight(1)
                .fontColor(item.completed ? '#8C9D97' : '#183A34')
                .decoration({ type: item.completed ? TextDecorationType.LineThrough : TextDecorationType.None })
              Button('删除').id(`delete-${item.id}`).fontSize(12).fontColor('#9C4942')
                .backgroundColor('#FFF0ED').height(32).onClick(() => this.remove(item.id))
            }.id(`todo-row-${item.id}`).padding(14).width('100%').backgroundColor('#FFFFFF').borderRadius(14)
          }
        }, (item: TodoItem): string => item.id)
      }.width('100%').layoutWeight(1)
      Text('离线使用 · 数据仅保存在当前应用').fontSize(12).fontColor('#8C9D97').padding({ bottom: 12 })
    }.width('100%').height('100%').padding({ left: 20, right: 20 }).backgroundColor('#F2F7F4')
  }
}
