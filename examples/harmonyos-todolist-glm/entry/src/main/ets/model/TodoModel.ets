// TodoModel.ets — 纯逻辑模型，不引入任何 SDK 或第三方模块。

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

export type TodoFilter = 'all' | 'active' | 'completed';

const MAX_TITLE_LENGTH = 80;

function isValidItem(item: TodoItem): boolean {
  if (item === null || item === undefined) {
    return false;
  }
  if (typeof item.id !== 'string' || item.id.length === 0) {
    return false;
  }
  if (typeof item.title !== 'string') {
    return false;
  }
  if (typeof item.completed !== 'boolean') {
    return false;
  }
  return true;
}

export class TodoModel {
  public items: TodoItem[] = [];
  private seq: number = 0;

  private nextId(): string {
    let candidate: string = '';
    do {
      candidate = `todo-${Date.now()}-${Math.floor(Math.random() * 1000000)}-${this.seq}`;
      this.seq++;
    } while (this.findById(candidate) !== null);
    return candidate;
  }

  private findById(id: string): TodoItem | null {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        return this.items[i];
      }
    }
    return null;
  }

  add(title: string): boolean {
    if (typeof title !== 'string') {
      return false;
    }
    const trimmed = title.trim();
    if (trimmed.length === 0 || trimmed.length > MAX_TITLE_LENGTH) {
      return false;
    }
    const item: TodoItem = { id: this.nextId(), title: trimmed, completed: false };
    this.items.push(item);
    return true;
  }

  toggle(id: string): void {
    const item = this.findById(id);
    if (item !== null) {
      item.completed = !item.completed;
    }
  }

  remove(id: string): void {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        this.items.splice(i, 1);
        return;
      }
    }
  }

  visible(filter: TodoFilter): TodoItem[] {
    const result: TodoItem[] = [];
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (filter === 'all') {
        result.push(item);
      } else if (filter === 'active' && !item.completed) {
        result.push(item);
      } else if (filter === 'completed' && item.completed) {
        result.push(item);
      }
    }
    return result;
  }

  countOf(filter: TodoFilter): number {
    return this.visible(filter).length;
  }

  serialize(): string {
    return JSON.stringify(this.items);
  }

  restore(json: string): void {
    this.items = [];
    this.seq = 0;
    if (typeof json !== 'string' || json.length === 0) {
      return;
    }
    let parsed: Array<TodoItem> = [];
    try {
      const obj = JSON.parse(json) as Object;
      if (Array.isArray(obj)) {
        const arr = obj as Array<Object>;
        for (let i = 0; i < arr.length; i++) {
          const raw = arr[i] as TodoItem;
          if (isValidItem(raw)) {
            const title: string = raw.title.length > MAX_TITLE_LENGTH
              ? raw.title.substring(0, MAX_TITLE_LENGTH) : raw.title;
            const item: TodoItem = { id: raw.id, title: title, completed: raw.completed };
            parsed.push(item);
          }
        }
      }
    } catch (e) {
      parsed = [];
    }
    for (let i = 0; i < parsed.length; i++) {
      this.items.push(parsed[i]);
    }
  }
}
