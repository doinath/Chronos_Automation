# UI selectors

## Auth

### Login form

- Email address: `page.getByRole('textbox', { name: 'Email address' })`
- Password: `page.getByLabel('Password', { exact: true })`
- Login button: `page.getByRole('button', { name: 'Login' })`

### Login results

- Allow Notifications: `page.getByRole('button', { name: 'Allow Notifications' })`
- Validation alert: `page.getByRole('alert')`
- Invalid-email message: `page.getByText('Invalid email.', { exact: true })`

### Logout

- Profile menu toggle: `page.getByRole('button', { name: 'Toggle profile menu' })`
- Logout button: `page.getByRole('button', { name: 'Logout' })`

## Admin navigation

- Navigation toggle: `page.getByRole('button', { name: 'Toggle Navigation' })`
- Dashboard link: `page.getByRole('link', { name: 'Dashboard' })`
- Attendance link: `page.getByRole('link', { name: 'Attendance' })`
- Reports link: `page.getByRole('link', { name: 'Reports' })`
- Leaves link: `page.getByRole('link', { name: 'Leaves' })`
- User Management link: `page.getByRole('link', { name: 'User Management' })`
- Departments link: `page.getByRole('link', { name: 'Departments' })`

## Attendances

### Table

- Attendance table container: `page.locator('div.table-body-overlay-host')`
- Table column headers: `page.locator('div.table-body-overlay-host').getByRole('columnheader')`

### Filters

- Filter by button: `page.getByRole('button', { name: 'Filter by' })`
- Employee Type category: `page.getByText('Employee Type', { exact: true })`
- Department category: `page.getByRole('button', { name: 'Department' })`
- Status category: `page.getByText('Status', { exact: true })`

### Summary Cards

- Summary card titles: `page.locator('span.status-card__title')`
- Employees present card: `page.getByText('Employees Present', { exact: true })`
- On time card: `page.getByText('On Time', { exact: true })`
- Late entry card: `page.getByText('Late Entry', { exact: true })`
- Absences card: `page.getByText('Absences', { exact: true })`
- On Leave card: `page.getByText('On Leave', { exact: true })`
