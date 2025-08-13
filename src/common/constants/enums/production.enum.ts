export enum ProductionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
}

export enum OrderStatus {
  PENDING = 'pending', // người dùng nhấn mua
  PROCESSING = 'processing', // đang xử lí đơn hàng
  DELIVERED = 'delivered', // đơn hàng thành công
  FAILED = 'failed', // Lỗi đơn hàng (vd: thanh toán thất bại)
}

export enum PaymentMethod {
  CASH = 'cash',
  BANK_TRANSFER = 'bank_transfer',
}
