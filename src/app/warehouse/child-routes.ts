export const childRoutes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { icon: 'dashboard', text: 'Dashboard' }
    },
    {
        path: 'warehouse-pages',
        loadChildren: ()=> import('./warehouse-pages/warehouse-pages.module').then(m => m.WarehousePagesModule),
        data: { icon: 'dashboard', text: 'Warehouses' }
        
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m=> m.ProfileModule),
        data: { icon: 'dashboard', text: 'Profile' }
    },
    {
        path: 'proposals',
        loadChildren: ()=> import('./proposals/proposals.module').then(m => m.proposalsModule),
        data: { icon: 'dashboard', text: 'Proposals' }
        
    },
    {
        path: 'transactions',
        loadChildren: ()=> import('./transactions/transactions.module').then(m => m.transactionsModule),
        data: { icon: 'dashboard', text: 'Transactions' }
        
    },
    {
		path: '**',
		loadChildren: () =>
			import('./dashboard/dashboard.module').then(m => m.DashboardModule),
		data: { icon: 'dashboard', text: 'Dashboard', role: 'factory' }
	}

];