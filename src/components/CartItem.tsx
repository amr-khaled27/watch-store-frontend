import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image_url: string;
  };
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div
      key={item.id}
      className="flex items-center gap-4 py-4 border-b border-primary/20 last:border-0"
    >
      <img
        src={`http://localhost:8000/${item.image_url}`}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-primary font-medium">${item.price.toFixed(2)}</p>

        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-2 bg-background rounded-lg">
            <button
              className="p-1 hover:text-accent transition-colors"
              onClick={onDecrease}
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              className="p-1 hover:text-accent transition-colors"
              onClick={onIncrease}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <button
            className="text-accent hover:text-accent/80 transition-colors"
            onClick={onRemove}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="text-lg font-bold">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
