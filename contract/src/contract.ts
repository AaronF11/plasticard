// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, UnorderedMap, initialize} from 'near-sdk-js';
import { User, Activities, Credits } from './models';


@NearBindgen({})
class CreditContract {
  users = new UnorderedMap<User>('map-uid-1');
  activities = new UnorderedMap<Activities>('map-uid-1');
  credits = new UnorderedMap<Credits>('map-uid-1');
  account: string = "udg.testnet";

  @initialize({privateFunction :true})
  init({account}:{account: string}){
    this.account = account;
  }

  @view({}) // This method is read-only and can be called for free
  get_example(): string { // This method give us an example command to use a call method
    let example = "near call <dev-account> <name-method>";
    return example;
  }

  @view({}) // This method is read-only and can be called for free
  get_example_method(): string[] { // This method give us an array of example commands to use a call method
    const array = ['get_example >>> Obtienes un ejemplo de la estructura <<<', 'get_example_method >>> Obtienes un arreglo de métodos disponibles <<<' 
    ,'set_user >>> Manda un usuario con todos sus atributos'];
    const examples: string[] = [];
    for (let index = 0; index < array.length; index++) {
      let example = `near call <dev-account> "${array[index]}"`;
      examples.push(example);
    }
    return examples;
  }

  @view({}) // This method is read-only and can be called for free
  get_balance(): string { // This method give us an example command to use a call method
    return ""
  }

  @call({})
  set_user({ account_id, name, gener, born_date, phone, career, admission, current_cycle, student_code, status, campus }:
    { account_id: string, name: string, gener: string, born_date: string, phone: string,
      career: string, admission: string, current_cycle: string,
      student_code: string, status: string, campus: string }): void {
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

  // @call({})
  // set_activities({account_id, total_amount}:{account_id: string, total_amount: bigint}): void{

  //   let information: Activities = {
  //     account_id: account_id,
  //     total_amount: total_amount
  //   };
  //   this.activities.set(account_id, information);
  //   const amount = total_amount * BigInt(0.20);
  //   let 
  // }
}
