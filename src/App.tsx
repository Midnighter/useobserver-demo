import * as React from "react";
import { useObserver } from "mobx-react-lite";
// Project imports
import "./styles.css";
import { useRootStore, ICard, IItem } from "./store";

type ItemProps = {
  item: IItem;
};

export const ItemComponent: React.FC<ItemProps> = ({ item }) => {
  return useObserver(() => {
    return <li>{item.name}</li>;
  });
};

type CardProps = {
  card: ICard;
};

export const CardComponent: React.FC<CardProps> = ({ card }) => {
  return useObserver(() => {
    return (
      <div className="card">
        <h2>{card.name}</h2>
        <ul>
          {card.items.map(item => (
            <ItemComponent key={item.id} item={item} />
          ))}
        </ul>
      </div>
    );
  });
};

export default function App() {
  const store = useRootStore();
  return useObserver(() => {
    return (
      <div className="App">
        <button onClick={store.setRandomCardTitle}>Modify Card Title</button>
        <button onClick={store.setRandomListItem}>Modify List Item</button>
        {store.cards.map(card => (
          <CardComponent key={card.id} card={card} />
        ))}
      </div>
    );
  });
}
