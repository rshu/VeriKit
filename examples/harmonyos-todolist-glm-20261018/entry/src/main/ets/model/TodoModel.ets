// 纯逻辑模型：不引入任何 SDK 或第三方模块。
export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

export type TodoFilter = 'all' | 'active' | 'completed';

// 序列化结果的显式数据结构，避免无类型对象字面量。
interface SerializedTodos {
  nextId: number;
  items: TodoItem[];
}

export class TodoModel {
  items: TodoItem[] = [];
  private nextIdNum: number = 1;

  private genId(): string {
    const id: string = `t${this.nextIdNum}`;
    this.nextIdNum += 1;
    return id;
  }

  add(title: string): boolean {
    if (title === null || title === undefined) {
      return false;
    }
    const trimmed: string = title.trim();
    if (trimmed.length === 0 || trimmed.length > 80) {
      return false;
    }
    const item: TodoItem = { id: this.genId(), title: trimmed, completed: false };
    this.items.push(item);
    return true;
  }

  toggle(id: string): void {
    for (const item of this.items) {
      if (item.id === id) {
        item.completed = !item.completed;
        return;
      }
    }
  }

  remove(id: string): void {
    const idx = this.items.findIndex((item: TodoItem): boolean => item.id === id);
    if (idx >= 0) {
      this.items.splice(idx, 1);
    }
  }

  visible(filter: TodoFilter): TodoItem[] {
    if (filter === 'active') {
      return this.items.filter((item: TodoItem): boolean => !item.completed);
    }
    if (filter === 'completed') {
      return this.items.filter((item: TodoItem): boolean => item.completed);
    }
    return this.items.slice();
  }

  serialize(): string {
    const data: SerializedTodos = { nextId: this.nextIdNum, items: this.items };
    return JSON.stringify(data);
  }

  restore(json: string): void {
    const fresh: TodoItem[] = [];
    let maxUsed = 0;
    if (json !== null && json !== undefined && json.length > 0) {
      try {
        const parsed = JSON.parse(json) as Record<string, Object>;
        const rawItems = parsed.items as TodoItem[];
        if (Array.isArray(rawItems)) {
          for (const raw of rawItems) {
            if (raw !== null && raw !== undefined
              && typeof raw.id === 'string' && raw.id.length > 0
              && typeof raw.title === 'string') {
              const restored: TodoItem = {
                id: raw.id,
                title: raw.title,
                completed: raw.completed === true
              };
              fresh.push(restored);
              const m = /^t(\d+)$/.exec(restored.id);
              if (m !== null) {
                const n = parseInt(m[1], 10);
                if (!Number.isNaN(n) && n > maxUsed) {
                  maxUsed = n;
                }
              }
            }
          }
        }
        const savedNext = parsed.nextId as number;
        if (typeof savedNext === 'number' && !Number.isNaN(savedNext) && savedNext > maxUsed) {
          maxUsed = savedNext;
        }
      } catch (e) {
        // 损坏数据按空列表恢复，保持应用可用。
      }
    }
    this.items = fresh;
    this.nextIdNum = maxUsed + 1;
  }
}
