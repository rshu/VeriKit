export interface TodoItem { id: string; title: string; completed: boolean; }
export type TodoFilter = 'all' | 'active' | 'completed';
export class TodoModel {
  items: TodoItem[] = [];
  private nextId: number = 1;
  add(title: string): boolean {
    const cleaned = title.trim();
    if (cleaned.length === 0 || Array.from(cleaned).length > 80) return false;
    const item: TodoItem = { id: `todo-${this.nextId++}`, title: cleaned, completed: false };
    this.items = this.items.concat([item]);
    return true;
  }
  toggle(id: string): void {
    this.items = this.items.map((item: TodoItem): TodoItem => {
      return { id: item.id, title: item.title, completed: item.id === id ? !item.completed : item.completed };
    });
  }
  remove(id: string): void { this.items = this.items.filter((item: TodoItem): boolean => item.id !== id); }
  visible(filter: TodoFilter): TodoItem[] {
    return this.items.filter((item: TodoItem): boolean => filter === 'all' || (filter === 'completed' ? item.completed : !item.completed));
  }
  serialize(): string { return JSON.stringify(this.items); }
  restore(json: string): void {
    const decoded = JSON.parse(json) as TodoItem[];
    if (!Array.isArray(decoded)) throw new Error('Invalid todo data');
    const restored: TodoItem[] = [];
    let next = 1;
    for (const item of decoded) {
      if (typeof item.id !== 'string' || typeof item.title !== 'string' || typeof item.completed !== 'boolean') throw new Error('Invalid todo item');
      restored.push({ id: item.id, title: item.title, completed: item.completed });
      const number = Number.parseInt(item.id.substring(5), 10);
      if (Number.isFinite(number)) next = Math.max(next, number + 1);
    }
    this.items = restored;
    this.nextId = next;
  }
}
