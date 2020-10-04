export const childRoutes = [

	{
		path: 'dashboard',
		loadChildren: () =>
			import('./dashboard/dashboard.module').then(m => m.DashboardModule),
		data: { icon: 'dashboard', text: 'Dashboard', role: 'factory' }
	},
	{
		path: 'profile',
		loadChildren: () =>
			import('./profile/profile.module').then(m => m.ProfileModule),
		data: { icon: 'bar_chart', text: 'Account', role: 'factory' }
	},
	{
		path: 'product',
		loadChildren: () =>
			import('./product/product.module').then(m => m.ProductModule),
		data: { icon: 'bar_chart', text: 'productManagement', role: 'factory' }
	},
	{
		path: 'option',
		loadChildren: () => import('./option-attribute/option.module').then(m => m.OptionModule),
		data: { icon: 'bar_chart', text: 'Option', role: 'factory' }
	},
	{
		path: 'enquiry',
		loadChildren: () => import('./enquiry/enquiry.module').then(m => m.EnquiryModule),
		data: { icon: 'bar_chart', text: "Enquiry" }
	},
	{
		path: 'sales',
		loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule),
		data: { icon: 'bar_chart', text: "Sales" }
	},
	{
		path: '**',
		loadChildren: () =>
			import('./dashboard/dashboard.module').then(m => m.DashboardModule),
		data: { icon: 'dashboard', text: 'Dashboard', role: 'factory' }
	}

];
