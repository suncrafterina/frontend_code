export const childRoutes = [
	{
		path: 'dashboard',
		loadChildren: () =>
			import('./dashboard/dashboard.module').then(m => m.DashboardModule),
		data: { icon: 'dashboard', text: 'Dashboard' }
	},
	{
		path: 'category',
		loadChildren: () =>
			import('./category/category.module').then(m => m.CategoryModule),
		data: { icon: 'bar_chart', text: 'Category' }
	},
	{
		path: 'faq',
		loadChildren: () =>
			import('./faq/faq.module').then(m => m.FaqModule),
		data: { icon: 'bar_chart', text: "FAQ's" }
	},
	{
		path: 'cms',
		loadChildren: () => import('./cms/cms.module').then(m => m.CMSModule),
		data: { icon:'bar_chart', text: 'CMS Pages' }
	},
	{
		path: 'enquiry',
		loadChildren: () => import('./enquiry/enquiry.module').then(m => m.EnquiryModule),
		data: { icon: 'bar_chart', text: "Enquiry" }
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then(m => m.ProfileModule),
    data: { icon: 'bar_chart', text: 'category' }

  },
  {
		path: 'vendors',
		loadChildren: () =>
			import('./vendors/vendors.module').then(m => m.VendorsModule),
		data: { icon: 'bar_chart', text: 'vendors' }
  },
  {
		path: 'Commission',
		loadChildren: () =>
			import('./category/category.module').then(m => m.CategoryModule),
		data: { icon: 'bar_chart', text: 'Commission' }
  },
  {
    path: 'shipping',
		loadChildren: () =>
			import('./shipping/shipping.module').then(m => m.ShippingModule),
		data: { icon: 'bar_chart', text: 'shipping' }
  },
  {
    path: 'requests',
		loadChildren: () =>
			import('./requests/requests.module').then(m => m.RequestsModule),
    data: { icon: 'bar_chart', text: 'requests' }
  },
  {
    path: 'product',
		loadChildren: () =>
			import('./product/product.module').then(m => m.ProductModule),
		data: { icon: 'bar_chart', text: 'product' }
  },
  {
    path: 'customer',
		loadChildren: () =>
			import('./customer/customer.module').then(m => m.CustomerModule),
		data: { icon: 'bar_chart', text: 'product' }
  },
  {
		path: 'sales',
		loadChildren: () =>
			import('./sales/sales.module').then(m => m.SalesModule),
		data: { icon: 'bar_chart', text: 'sales' }
  },
  {
		path: 'banner',
		loadChildren: () =>
			import('./banner/banner.module').then(m => m.BannerModule),
		data: { icon: 'bar_chart', text: 'sales' }
  },
  {
		path: 'client',
		loadChildren: () =>
			import('./client/client.module').then(m => m.ClientModule),
		data: { icon: 'bar_chart', text: 'sales' }
  },
  
  
 
 
 
  /*
=======
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { icon: 'dashboard', text: 'Dashboard' }
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./category/category.module').then(m => m.CategoryModule),
    data: { icon: 'bar_chart', text: 'category' }
  },
  {
    path: 'faq',
    loadChildren: () =>
      import('./faq/faq.module').then(m => m.FaqModule),
    data: { icon: 'bar_chart', text: 'faq' }

  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then(m => m.ProfileModule),
    data: { icon: 'bar_chart', text: 'category' }

  },
 
  */
  // {
  //   path: 'tables',
  //   loadChildren: () =>
  //     import('./tables/tables.module').then(m => m.TablesModule),
  //   data: { icon: 'table_chart', text: 'Tables' }
  // },
  // {
  //   path: 'forms',
  //   loadChildren: () => import('./forms/forms.module').then(m => m.FormsModule),
  //   data: { icon: 'assignment', text: 'Forms' }
  // },
  // {
  //   path: 'mat-grid',
  //   loadChildren: () =>
  //     import('./mat-grid/mat-grid.module').then(m => m.MatGridModule),
  //   data: { icon: 'grid_on', text: 'Flex Grid' }
  // },
  // {
  //   path: 'mat-components',
  //   loadChildren: () =>
  //     import('./mat-components/mat-components.module').then(
  //       m => m.MatComponentsModule
  //     ),
  //   data: { icon: 'code', text: 'Material Components' }
  // },
  
  
];
