import * as React from 'react';
import { types, Instance } from 'mobx-state-tree';
import { connectReduxDevtools } from 'mst-middlewares';
import { useLocalStore } from 'mobx-react-lite';
import * as faker from 'faker';

export const Item = types
  .model('Item', {
    id: types.identifier,
    name: types.string
  })
  .actions(self => ({
    setName(name: string) {
      console.debug(`Item(${self.id}).name = ${name}`);
      self.name = name;
    }
  }));

export interface IItem extends Instance<typeof Item> {}

export const Card = types
  .model('Card', {
    id: types.identifier,
    name: types.string,
    items: types.array(Item)
  })
  .actions(self => ({
    setName(name: string) {
      console.debug(`Card(${self.id}).name = ${name}`);
      self.name = name;
    }
  }));

export interface ICard extends Instance<typeof Card> {}

const getRandomIndex = (length: number) => {
  return Math.floor(Math.random() * length);
};

const RootStore = types
  .model({
    cards: types.array(Card)
  })
  .actions(self => ({
    setRandomCardTitle() {
      const cardIndex = getRandomIndex(self.cards.length);
      self.cards[cardIndex].setName(faker.name.findName());
    },
    setRandomListItem() {
      const cardIndex = getRandomIndex(self.cards.length);
      const itemIndex = getRandomIndex(self.cards[cardIndex].items.length);
      self.cards[cardIndex].items[itemIndex].setName(faker.name.findName());
    }
  }));

export type RootStoreModel = Instance<typeof RootStore>;

const RootStoreContext = React.createContext<RootStoreModel>(
  {} as RootStoreModel
);

const initRootStore = (): RootStoreModel => {
  return RootStore.create({
    cards: [
      {
        id: '1',
        name: 'First',
        items: [
          { id: '1-1', name: 'Apple' },
          { id: '1-2', name: 'Oranges' }
        ]
      },
      {
        id: '2',
        name: 'Second',
        items: [
          { id: '2-1', name: 'Whisky' },
          { id: '2-2', name: 'Wine' }
        ]
      }
    ]
  });
};

type Props = {
  children?: React.ReactNode;
};

export const RootStoreProvider: React.FC<Props> = ({ children }) => {
  const store = useLocalStore(initRootStore);
  if (process.env.NODE_ENV === 'development') {
    connectReduxDevtools(require('remotedev'), store);
  }
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootStore = () => {
  const store = React.useContext(RootStoreContext);
  if (!store) {
    throw new Error('You have forgotten to use the RootStoreProvider.');
  }
  return store;
};
