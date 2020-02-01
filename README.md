# ALA-App

Current build of Advantage Tracker v1.0

## **Application Views**

- Daily
- Details (by ADL)
- Calendar
- Summary
- Past Due (coming soon)

## Todos - categorized

**User Flows**

**Styles**

- [ ] Fix <DashboardNav/>
  - Add "back arrow" to upper left, next to <Sidebar/> and make it larger!

---

## v2 Features

- [ ] Enable quick ADL Category change from the <DetailsView/>
  - Consider having an ADL Category Dropdown menu to switch categories.

---

## Application Structure

```
                                    <App/>
                                   /      \
            <NonAuthenticatedView/>        <AuthenticatedView/>
          /                                                     \
    <LoginPage/>                                             <DashboardContainer/>
   /                                                         /                    \
<LoginForm/>                                           <Dashboard/>               <Sidebar/>
                                                          ||
                                                        Views

```

#### <DetailsView> Children Structure

```
                                      <DetailsView>
                                    /
                          <TasksPanel>
                         /            \
              (SCHEDULED)             (UNSCHEDULED)
               <TaskList>              <TaskList>
              /           \
        <Modal>          <SubtaskList>
           |
      <EditTaskForm>
```
