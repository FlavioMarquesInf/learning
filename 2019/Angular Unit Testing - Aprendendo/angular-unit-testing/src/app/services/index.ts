import { MyService} from './my.service';
import { MyOtherService } from './my-other.service';

export const services: any[] = [MyService, MyOtherService];

export * from './my.service';
export * from './my-other.service';
