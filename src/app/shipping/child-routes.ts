export const childRoutes = [
    {
      path: 'dashboard',
      loadChildren: () =>
        import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      data: { icon: 'dashboard', text: 'Dashboard',role:'shipping' }
    },
    {
      path: 'locations',
      loadChildren: ()=> import('./locations/locations.module').then(m => m.LocationsModule),
      data: { icon: 'dashboard', text: 'Locations' }
      
  },
  {
    path: 'quotations',
    loadChildren: ()=> import('./quotations/quotations.module').then(m => m.QuotationsModule),
    data: { icon: 'dashboard', text: 'Quatations' }
    
},
{
  path: 'transactions',
  loadChildren: ()=> import('./transactions/transactions.module').then(m => m.transactionsModule),
  data: { icon: 'dashboard', text: 'Transactions' }
  
},
{
  path: 'profile',
  loadChildren: () => import('./profile/profile.module').then(m=> m.ProfileModule),
  data: { icon: 'dashboard', text: 'Profile' }
},

      
    
  ];
  