export const errorMessages = {
	email: {
		email: 'emailValid',
		duplicateEmail: 'emailAlready',
		required: 'emailRequird',
		maxlength: 'emailMax',
		pattern: 'emailValid'
	},
	email_address: {
		email: 'Invalid email address',
		duplicateEmail: 'Email address already exist.',
		required: 'enterEmail',
		maxlength: 'Max 75 characters are allowed.',
		pattern: 'InvalidEmail'		
	},
	verification_code: {
		verification_code: 'verificationInvalid',
		required: 'verificationRequired',
		maxlength: 'verificationMaxlength',
		minlength: 'verificationMin',
	},
	otp: {
		otp: 'otpInvalid',
		required: 'otpRequired',
		maxlength: 'otpMaxlength',
		minlength: 'otpMinlength',
	},
	new_password: {
		minlength: 'passwordMinLength',
		match: 'PasswordMismatch',
		invalidPassword: 'passwordInvalid',
		maxlength: 'PasswordMaxLength32',
		required: 'pleaseEnterYourPassword'
	},

	emails: {
		email: 'Invalid email address',
		duplicateEmail: 'Email address already exist.',
		required: 'Please enter your email address.',
		maxlength: 'Max 75 characters are allowed.',
		pattern: 'Invalid email address.',
		unique: 'Duplicate email not allowed'
	},
	
	username: {
		email: 'Invalid email address',
		required: 'Please enter your email address.',
		pattern: 'Invalid email address.'
	},
	fullName: {
		required: 'Please enter your first name.',
		minlength: 'Full name need to be at least 3 characters in length.',
		maxlength: 'Max 100 characters are allowed.',
		pattern: 'Full name can contain only alphanumeric characters, dot(.) and space only.'
	},
	companyName: {
		required: 'Please enter your company name.',
		minlength: 'Company name need to be at least 3 characters in length.',
		maxlength: 'Max 100 characters are allowed.',
		pattern: 'Company can contain only alphanumeric characters, dot(.) and space only.'
	},
	password: {
		minlength: 'passwordMinLength',
		confirm: 'PasswordMismatch',
		invalidPassword: 'passwordInvalid',
		maxlength: 'PasswordMaxLength32',
		required: 'pleaseEnterYourPassword'
	},
	confirm_password: {
		minlength: 'passwordMinLength',
		// mismatch: 'Password mismatch.',
		invalidPassword: 'passwordInvalid',
		maxlength: 'PasswordMaxLength32',
		required: 'pleaseEnterYourConfirmPassword',
		misMatch: "PasswordMismatch"
	},
	confirmPassword:{
		minlength: 'passwordMinLength',
		// mismatch: 'Password mismatch.',
		invalidPassword: 'passwordInvalid',
		maxlength: 'PasswordMaxLength32',
		required: 'pleaseEnterYourPassword',
		misMatch: "PasswordMismatch"
	},
	current_password: {
		minlength: 'passwordMinLength',
		confirm: 'PasswordMismatch',
		invalidPassword: 'passwordInvalid',
		maxlength: 'PasswordMaxLength32',
		required: 'pleaseEnterYourPassword'
	},
	phoneNumber: {
		required: 'Please enter your phone number.',
		minlength: 'PhonenumberMin',
		maxlength: 'PhonenumberMax',
		pattern: 'Phonenumberisinvalid.'
	},
	phone: {
		required: 'PleaseEnterYourPhoneNumber.',
		minlength: 'Phone number need to be at least 10 characters in length.',
		maxlength: 'Max 15 characters are allowed.',
		pattern: 'Phone number is invalid.'
	},
	country: {
		required: 'countrySelect'
	},
	state: {
		required: 'stateSelect'
	},
	city: {
		required: 'citySelect'
	},
	city_id:{
		required:'City is required'
	},
	
	address: {
		required: 'Please enter your address.',
		minlength: 'Address need to be at least 3 characters in length.',
		maxlength: 'Max 255 characters are allowed.',
		pattern: 'Address can contain only alphanumeric characters, dot(.) and space only.'
	},
	postalCode: {
		required: 'Please enter postal code.',
		invalidZip: 'Postal code invalid.',
		maxlength: 'Max 6 characters are allowed.'
	},
	addressLineOne: {
		required: 'Please enter your address.',
		minlength: 'Address need to be at least 3 characters in length.',
		maxlength: 'Max 255 characters are allowed.',
		pattern: 'Address can contain only alphanumeric characters, dot(.) and space only.'
	},
	addressLineTwo: {
		required: 'Please enter your address.',
		minlength: 'Address need to be at least 3 characters in length.',
		maxlength: 'Max 255 characters are allowed.',
		pattern: 'Address can contain only alphanumeric characters, dot(.) and space only.'
	},
	productTitle: {
		required: 'Please enter product title.',
		minlength: 'Product title need to be at least 3 characters in length.',
		maxlength: 'Max 100 characters are allowed.',
	},
	sku: {
		required: 'skuProduct',
		pattern: 'skuPattern'
	},
	asin: {
		required: 'Please enter ASIN code.',
		invalidASIN: 'Please enter valid ASIN.',
		pattern: 'ASIN must have alphanumeric.',
	},
	minimumThreshold: {
		required: 'Please enter minimum threshold.',
		maxlength: 'Max 5 characters are allowed.',
		pattern: 'Minimum Threshold can contain only digits.',
		invalid: 'Threshold can contain only digits.',
		invalidNumber: 'Threshold can contain only digits.'
	},

	length: {
		required: 'Please enter product length.',
		pattern: 'Length can contain only digits.',
		invalidNumber: 'Length can contain only digits.'
	},
	width: {
		required: 'Please enter product width.',
		pattern: 'Width can contain only digits.',
		invalidNumber: 'Width can contain only digits.'
	},
	height: {
		required: 'Please enter product height.',
		pattern: 'Height can contain only digits.',
		invalidNumber: 'Height can contain only digits.'
	},
	weight: {
		required: 'productweight.',
		pattern: 'weightPattern',
		invalidNumber: 'weightPattern'
	},
	sorting_order: {
		required: 'sortingOrderRequired',
		requiredNumber: 'sortingOrderRequiredNumber',
		numberIntegerRequired: 'sortingOrderNumberIntegerRequired'
	},
	title: {
		required: 'titleRequired',
		minlength: 'titleMinLength',
		maxlength: 'titleMaxLength',
		pattern: 'Space not allowed'
	},
	attributes_values: {
		required: 'attributesValuesRequired',
		minlength: 'attributesValuesMinlength',
		maxlength: 'attributesValuesMaxlength',
	},
	first_name: {
		required: 'PleaseEnterYourFirstName',
		minlength: 'FnameMin3',
		maxlength: 'FnameMin25',
		pattern: 'namePartten'
	},
	last_name: {
		required: 'pleaseEnterYourLastName',
		minlength: 'FnameMin3',
		maxlength: 'FnameMin25',
		pattern: 'namePartten'
	},
	lang_key:
	{
		required: 'Please select language.',
	},
	answer: {
		required: 'enterAnswer',
		minlength: 'answerMinLength',
		maxlength: 'answerMaxLength'
	},
	faq: {
		required: 'Please enter your question.',
		minlength: 'Question need to be at least 3 characters in length.',
		maxlength: 'Max 100 characters are allowed.',
	},
	role:
	{
		required: 'pleaseSelectRole',
	}, 
	organization_name: {
		required: 'organizationRequired',
		minlength: 'minLength3',
		maxlength: 'MaxLength100',
	},
	agent_code:
	{
		required: 'pleaseEnterCode',
		minlength: 'agentCodeMinLength3',
		maxlength: 'agentCodeMaxLength15',
	},
	factory_name:
	{
		required: 'pleaseEnterfactoryName',
		minlength: 'factoryNameMinLength3',
		maxlength: 'factoryNameMaxLength75',
	},
	phone_number:
	{
		required: 'pleaseEnterPhoneNumber',
		minlength: 'PhonenumberMin',
		maxlength: 'PhonenumberMax',
		pattern: 'Phonenumberisinvalid'
	},
	type_of_business:
	{
		required: 'pleaseSelectBusiness',
		minlength: 'typeOfBusinessMinLength3',
		maxlength: 'typeOfBusinessMaxLength75',
		
	},
	address_line_1:
	{	
		required: "addressLine1",
		minlength: "addressLine1Min",
		maxlength:"addressLine1Max"
	},
	address_line_2:
	{
		minlength: "addressLine1Min",
		maxlength:"addressLine1Max"
	},
	billing_address_1:
	{	
		required: "addressLine1",
		minlength: "addressLine1Min",
		maxlength:"addressLine1Max"
	},
	billing_address_2:
	{
		minlength: "addressLine1Min",
		maxlength:"addressLine1Max"
	},
	zip_code:
	{
		required: 'enterZipCode',
		minlength: 'zipCodeMinLength3',
		maxlength: 'zipCodeMaxLength25',
		invalidZip: 'invalidZip',
	},
	description: {
		required: 'enterDescription',
		minlength: 'descriptionMin3',
		maxlength: 'descriptionMax500',
	},
	warehouse_name: {
		required: 'EnterWarehouseName',
		minlength: 'WarehouseNameMin2',
		maxLength: 'WarehouseNameMax255'
	},
	warehouse_images:{
		required: 'Please select warehouse image'
	},
	warehouse_size:{
		required: 'enterWarehouseSize',
		invalidNumber: 'EnterNumberOnly'
	},
	available_space: {
		required: 'enterAvailableSpace',
		invalidNumber: 'EnterNumberOnly'
	},
	build_year: {
		required: 'PleaseSelectBuildYear',
	},

	reply: {
		required: 'enterReply',
		minlength: 'ReplyMin3Character',
		maxlength: 'ReplyMax255Character',
	},	
	country_id:
	{
		required: 'PleaseEnterCountry',
		minlength: 'countryMin3',
		maxlength: 'countryMax100',
	},
	affiliate_type:
	{
		required: 'PleaseSelectAffiliate',
	},
	warehouse: {
		required: 'warehouseComm',
		requiredNumber: 'warehouseNumber',
		numberIntegerRequired:'warehouseInvalid',
		max:"maxCommission",
		min:"minCommission",
		
	},
	shipper: {
		required: 'shipperComm',
		max:"maxCommission",
		min:"minCommission",
		numberIntegerRequired:'warehouseInvalid'
	},
	agent: {
		required: 'agentEnter',
		numberIntegerRequired:'warehouseInvalid',
		max:"maxCommission",
		min:"minCommission"
	},
	commission: {
		required: 'commisssionRequird',
		requiredNumber: 'commisssionRequirdNumber',
		numberIntegerRequired:'commisssionInteger'	
	},
	type: {
		required: 'typeRequired',
	},
	value: {
		required: 'valueRequired',
		minlength: 'valueMin',
		maxlength: 'valueMax'
	},
	bank_name:
	{
		required: 'PleaseEnterBankName',
		minlength: 'bankMin3',
		maxlength: 'bankMax50',
	},
	account_number:
	{
		required: 'PleaseEnterAccountNumber',
		minlength: 'accountMin3',
		maxlength: 'accountMax20',
		invalidNumber: 'invalidNumber'
	},
	swift_code:
	{
		required: 'PleaseEnterSwiftCode',
		minlength: 'swiftMin3',
		maxlength: 'swiftMax15',
	},
	language:
	{
		required: 'languageRequired',
	},
	name:
	{
		required: 'nameRequired',
		minlength: 'minLength3',
		maxlength: 'MaxLength100',
	},
	meta_tag_title:
	{
		required: 'metaTitleRequired',
		minlength: 'minLength3',
		maxlength: 'MaxLength255',
	},
	meta_description:
	{
		required: 'metaDescriptionRequired',
		minlength: 'minLength3',
		maxlength: 'maxLength255',

	},
	meta_tag_keyword:
	{
		required: 'metaKeywordRequired',
		minlength: 'minLength3',
		maxlength: 'maxLength255',
	},
	tags:
	{
		required: 'tagsRequired',
	},
	manufacturer:
	{
		required: 'manufacturerRequired',
		minlength: 'minLength3',
		maxlength: 'maxLength255',
	},
	model:
	{
		required: 'modelRequired',
		minlength: 'minLength3',
		maxlength: 'maxLength15',
	},
	price:
	{
		required: 'priceRequired',
		minlength: 'minLength3',
		pattern: "pricePattern"
	},
	dimension:
	{
		required: 'dimensionRequired',
		minlength: 'minLength3',
		pattern:"dimensionPattern"
	},
	length_unit:
	{
		required: 'lengthunitRequired',
		minlength: 'minLength3',
	},
	weight_unit:
	{
		required:'weightunitRequired'
	},
	tag_list:
	{
		required:'tagsRequired'
	},
	category_id:
	{
		required:"Please"
	},
	attribute_id:
	{
		required:"Please"
	},
	order_code:{
		required:"Order Id is required"
	},
	amount:
	{
		required:"Amount is required"
	},
	toDate:
	{
		required:"Please"
	},
	banner_type:
	{
		required:"PleaseSelectType"
	}

}