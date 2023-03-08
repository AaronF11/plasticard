// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, UnorderedMap, initialize} from 'near-sdk-js';
import { User, Activities, Credits } from './models';


@NearBindgen({})
class CreditContract {
  //Atributos
  users = new UnorderedMap<User>('map-uid-1');
  activities = new UnorderedMap<Activities>('map-uid-1');
  credits = new UnorderedMap<Credits>('map-uid-1');
  balance: bigint = BigInt(0);
  account: string = "udg.testnet";

  //Inicializador
  @initialize({privateFunction :true})
  init({account}:{account: string}){
    this.account = account;
  }

  //get_example(): Este método devuelve un ejemplo de cómo utilizar un método de llamada. El nombre de la función es descriptivo y refleja su propósito.
  @view({})
  get_example(): string {
    let example = "near call <dev-account> <name-method>";
    return example;
  }

  //get_example_method(): Este método devuelve un arreglo de cadenas de caracteres que contienen ejemplos de diferentes métodos de llamada. El nombre de la función es descriptivo y refleja su propósito.
  @view({})
  get_example_method(): string[] {
    const array = ['get_example >>> Obtienes un ejemplo de la estructura <<<', 'get_example_method >>> Obtienes un arreglo de métodos disponibles <<<' 
    ,'set_user >>> Manda un usuario con todos sus atributos'];
    const examples: string[] = [];
    for (let index = 0; index < array.length; index++) {
      let example = `near call <dev-account> "${array[index]}"`;
      examples.push(example);
    }
    return examples;
  }

  //get_balance(): Este método devuelve el saldo actual del contrato en NEAR. El nombre de la función es descriptivo y refleja su propósito.
  @view({})
  get_balance(): bigint {
    this.balance = near.accountBalance();
    return BigInt(this.balance);
  }

  //set_user(): Este método se utiliza para agregar información sobre un usuario. El nombre de la función es descriptivo y refleja su propósito.
  @call({})
  set_user({ account_id, name, gener, born_date, phone, career, admission, current_cycle, student_code, status, campus }: { account_id: string, name: string, gener: string, born_date: string, phone: string,
      career: string, admission: string, current_cycle: string, student_code: string, status: string, campus: string }): void {
        let information: User = {
          account_id: account_id,
          name: name,
          gener: gener,
          born_date: born_date,
          phone: phone,
          career: career,
          admission: admission,
          current_cycle: current_cycle,
          student_code: student_code,
          status: status,
          campus: campus
          };
    this.users.set(account_id, information);
  }

  //set_activities(): Este método se utiliza para agregar información sobre actividades y actualizar el saldo del contrato en función del total de NEAR involucrado en la actividad. El nombre de la función es descriptivo y refleja su propósito.
  @call({})
  set_activities({account_id, total_amount}:{account_id: string, total_amount: bigint}): void{
    let information: Activities = {
      account_id: account_id,
      total_amount: total_amount
    };
    this.activities.set(account_id, information);
    this.balance = total_amount * BigInt(0.022);
  }
}