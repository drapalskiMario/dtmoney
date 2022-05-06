import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  type: 'deposit' | 'withdraw';
  category: string;
  amount: number;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionProvidersProps {
  children: ReactNode
}

interface TransactionContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

export const TransactionsProvider = ({ children }: TransactionProvidersProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('/transactions').then(({ data }) => setTransactions(data.transactions));
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    try {
      const response = await api.post('/transactions', {
        ...transactionInput,
        createdAt: new Date()
      });
      const { transaction } = response.data;
      setTransactions([...transactions, transaction]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TransactionContext.Provider value={{
      transactions,
      createTransaction
    }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  return context;
}