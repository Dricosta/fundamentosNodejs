import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';


interface Request {
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {


    const balance = this.transactionsRepository.getBalance();

    switch (type) {
      case "outcome":
        if(value > balance.total){
          throw Error('Você não tem saldo suficiente');
        }
        break;
      default:
        break;
    }

    const transactions = this.transactionsRepository.create({ title, value, type });

    return transactions;
  }
}

export default CreateTransactionService;
