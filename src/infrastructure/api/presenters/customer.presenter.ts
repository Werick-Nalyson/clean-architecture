import { toXML } from 'jstoxml'
import { OutputListCustomerDto } from '../../../usecases/customer/list/list.customer.dto';

export default class CustomerPresenter {
  static toXML (data: OutputListCustomerDto): string {
    const xmlOptions = {
      header: true,
      indent: "  ",
      newline: '\n',
      allowEmpty: true,
    }

    return toXML (
      {
        customers: {
          customer: data.customers.map((customer) => ({
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              city: customer.address.city,
              number: customer.address.number,
              zip: customer.address.zip,
            }
          }))
        }
      },
      xmlOptions
    )
  }
}
