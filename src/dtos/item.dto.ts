export class CreateItemDto {
  readonly content: string;
}

export class DeleteItemDto {
  success: boolean;
}

export class ItemDto {
  id: string;
  content: string;
  isChecked: boolean;
  createdAt: Date;
}
