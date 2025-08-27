//item 데이터 타입 정의
interface Item {
  id: string;
  tenantId: string;
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
}

export type { Item };