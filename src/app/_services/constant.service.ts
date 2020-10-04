import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  adminShowDateFormat = 'MM/dd/yyyy';
  userRoles = { //Roles of user
    'FACTORYVENDOR':'ROLE_FACTORY_VENDOR',
    'SHIPPINGVENDOR':'ROLE_SHIPPING_VENDOR',
    'WAREHOUSEVENDOR':'ROLE_WAREHOUSE_VENDOR',
    'CUSTOMER':'ROLE_CUSTOMER',
    'AGENT  ':'ROLE_AGENT  ',
    'ADMIN':'admin'
  }
  userRolesDropdown =[
    {'title':'Factory','value':'factory'},
    {'title':'Warehouse','value':'warehouse'},
    {'title':'Shipping','value':'shipping'}
  ]
  LengthUnitList =
  [
    //{'title':'Centimeter','value':'Centimeter'},
    {'title':'Inches','value':'INCH'},
    //{'title':'Ft','value':'FT'}
  ]
  weightUnitList =
  [
    {'title':'Kilogram','value':'KG'},
    //{'title':'Liters','value':'LITERS'}
  ]
 
}



