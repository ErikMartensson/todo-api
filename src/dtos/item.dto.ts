export class CreateItemDto {
  readonly content: string;
}

export class ItemDto {
  id: string;
  content: string;
  isChecked: boolean;
  createdAt: Date;
}
