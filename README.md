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

---

## **Report Params & Sorting Criteria/Values**

| ReportParameterID | ReportNameID | DataTypeID | Name                | Description                | DefaultValue | IsRequire | IsActive |
| ----------------- | ------------ | ---------- | ------------------- | -------------------------- | ------------ | --------- | -------- |
| 200               | 25           | 9          | FacilityID          | Facility Identifier Code   | NULL         | 1         | 1        |
| 201               | 25           | 5          | ExceptionStartDate  | Exception Start Date       | NULL         | 1         | 1        |
| 202               | 25           | 5          | ExceptionEndDate    | Exception End Date         | NULL         | 1         | 1        |
| 203               | 25           | 10         | ShiftID             | Shift identifier code      | NULL         | 0         | 1        |
| 204               | 25           | 16         | RoomNumber          | Room Number                | NULL         | 0         | 1        |
| 205               | 25           | 10         | ResolutionID        | Resolution identifier code | NULL         | 0         | 1        |
| 206               | 25           | 1          | SortByResident      | Sort By Resident flag      | false        | 0         | 1        |
| 207               | 25           | 1          | SortByStaff         | Sort By Staff flag         | false        | 0         | 1        |
| 208               | 25           | 1          | SortByShift         | Sort By Shift flag         | false        | 0         | 1        |
| 209               | 25           | 1          | SortByReason        | Sort By Reason flag        | false        | 0         | 1        |
| 210               | 26           | 9          | FacilityID          | Facility Identifier Code   | NULL         | 1         | 1        |
| 211               | 26           | 5          | CompletionStartDate | Completion Start Date      | NULL         | 1         | 1        |
| 212               | 26           | 5          | CompletionEndDate   | Completion End Date        | NULL         | 0         | 1        |
| 213               | 26           | 10         | ShiftID             | Shift identifier code      | NULL         | 0         | 1        |
| 214               | 26           | 16         | RoomNumber          | Room Number                | NULL         | 0         | 1        |
| 215               | 26           | 1          | SortByResident      | Sort By Resident flag      | false        | 0         | 1        |
| 216               | 26           | 1          | SortByStaff         | Sort By Staff flag         | false        | 0         | 1        |
| 217               | 26           | 1          | SortByShift         | Sort By Shift flag         | false        | 0         | 1        |
| 218               | 26           | 1          | SortByReason        | Sort By Reason flag        | false        | 0         | 1        |
| 219               | 26           | 1          | SortByTimeStamp     | Sort By TimeStamp flag     | false        | 0         | 1        |

---

## Complete Params/Sorts Table

The following includes params and sorts NOT specific to the Completion and Exception reports but ALL reports available.

| ReportParameterID | ReportNameID | DateTypeID | Name                | Description                     | DefaultValue | IsRequire | IsActive |
| ----------------- | ------------ | ---------- | ------------------- | ------------------------------- | ------------ | --------- | -------- |
| 1                 | 2            | 9          | FacilityID          | Facility Identifier Code        | NULL         | 1         | 1        |
| 2                 | 3            | 10         | Days                | Number of Days                  | NULL         | 1         | 1        |
| 3                 | 4            | 5          | LocalTimeExecuted   | Local Time Executed             | NULL         | 1         | 1        |
| 4                 | 4            | 16         | UNITTYPE            | Unit type                       | NULL         | 0         | 1        |
| 5                 | 4            | 16         | BEGINROOM           | Begin room                      | NULL         | 0         | 1        |
| 6                 | 4            | 16         | ENDROOM             | End room                        | NULL         | 0         | 1        |
| 7                 | 4            | 16         | SORT                | Sort                            | NULL         | 0         | 1        |
| 8                 | 4            | 9          | FacilityID          | Facility Identifier Code        | NULL         | 0         | 1        |
| 9                 | 5            | 5          | LocalTimeExecuted   | Local Time Executed             | NULL         | 1         | 1        |
| 10                | 5            | 16         | UNITTYPE            | Unit type                       | NULL         | 0         | 1        |
| 11                | 5            | 16         | BEGINROOM           | Begin room                      | NULL         | 0         | 1        |
| 12                | 5            | 16         | ENDROOM             | End room                        | NULL         | 0         | 1        |
| 13                | 5            | 16         | SORT                | Sort                            | NULL         | 0         | 1        |
| 14                | 5            | 9          | ParentID            | Parent Identifier Code          | NULL         | 0         | 1        |
| 15                | 6            | 5          | StartDate           | Start Date                      | NULL         | 0         | 1        |
| 16                | 6            | 5          | EndDate             | End Date                        | NULL         | 0         | 1        |
| 17                | 6            | 5          | LocalTimeExecuted   | Local Time Executed             | NULL         | 1         | 1        |
| 18                | 6            | 9          | FacilityID          | Facility Identifier Code        | NULL         | 1         | 1        |
| 19                | 6            | 5          | TimeBegin           | Begin Time                      | NULL         | 0         | 1        |
| 20                | 6            | 5          | TimeEnd             | End Time                        | NULL         | 0         | 1        |
| 21                | 6            | 16         | UNITTYPE            | Unit type                       | NULL         | 0         | 1        |
| 22                | 6            | 16         | ReportingToState    | Reporting To State              | NULL         | 0         | 1        |
| 23                | 6            | 16         | TimeFrame           | Time frame                      | NULL         | 1         | 1        |
| 24                | 7            | 5          | StartDate           | Start Date                      | NULL         | 0         | 1        |
| 25                | 7            | 5          | EndDate             | End Date                        | NULL         | 0         | 1        |
| 26                | 7            | 5          | LocalTimeExecuted   | Local Time Executed             | NULL         | 1         | 1        |
| 27                | 7            | 9          | FacilityID          | Facility Identifier Code        | NULL         | 1         | 1        |
| 28                | 7            | 5          | TimeBegin           | Begin Time                      | NULL         | 0         | 1        |
| 29                | 7            | 5          | TimeEnd             | End Time                        | NULL         | 0         | 1        |
| 30                | 7            | 16         | UNITTYPE            | Unit type                       | NULL         | 0         | 1        |
| 31                | 7            | 16         | ReportingToState    | Reporting To State              | NULL         | 0         | 1        |
| 32                | 8            | 5          | StartDate           | Start Date                      | NULL         | 0         | 1        |
| 33                | 8            | 5          | EndDate             | End Date                        | NULL         | 0         | 1        |
| 34                | 8            | 5          | LocalTimeExecuted   | Local Time Executed             | NULL         | 1         | 1        |
| 35                | 8            | 9          | FacilityID          | Facility Identifier Code        | NULL         | 1         | 1        |
| 36                | 8            | 5          | TimeBegin           | Begin Time                      | NULL         | 0         | 1        |
| 37                | 8            | 5          | TimeEnd             | End Time                        | NULL         | 0         | 1        |
| 38                | 8            | 16         | UNITTYPE            | Unit type                       | NULL         | 0         | 1        |
| 39                | 8            | 16         | ReportingToState    | Reporting To State              | NULL         | 0         | 1        |
| 40                | 9            | 9          | FacilityID          | Facility Identifier Code        | NULL         | 1         | 1        |
| 41                | 9            | 5          | LocalTimeExecuted   | Local Time Executed             | NULL         | 1         | 1        |
| 42                | 9            | 10         | IncidentID          | Incident Identifier Code        | NULL         | 1         | 1        |
| 43                | 10           | 9          | FacilityID          | Facility Identifier Code        | NULL         | 1         | 1        |
| 44                | 10           | 5          | LocalTimeExecuted   | Local Time Executed             | NULL         | 1         | 1        |
| 45                | 10           | 10         | IncidentID          | Incident Identifier Code        | NULL         | 1         | 1        |
| 46                | 11           | 16         | InvoiceCustomer     | Customer invoice number?        | NULL         | 1         | 1        |
| 47                | 12           | 10         | InvoiceNum          | Invoice number                  | NULL         | 1         | 1        |
| 48                | 13           | 9          | FacilityID          | Facility Identifier Code        | NULL         | 0         | 1        |
| 49                | 14           | 9          | FacilityID          | Facility Identifier Code        | NULL         | 0         | 1        |
| 50                | 14           | 5          | LocalTimeExecuted   | Local Time Executed             | NULL         | 1         | 1        |
| 51                | 15           | 9          | FacilityID          | Facility Identifier Code        | NULL         | 0         | 1        |
| 52                | 15           | 5          | LocalTimeExecuted   | Local Time Executed             | NULL         | 1         | 1        |
| 53                | 15           | 16         | UNITTYPE            | Unit type                       | NULL         | 0         | 1        |
| 54                | 15           | 16         | BEGINROOM           | Begin room                      | NULL         | 0         | 1        |
| 55                | 15           | 16         | ENDROOM             | End room                        | NULL         | 0         | 1        |
| 56                | 15           | 16         | SORT                | Sort                            | NULL         | 0         | 1        |
| 57                | 16           | 9          | FacilityID          | Facility Identifier Code        | NULL         | 0         | 1        |
| 58                | 16           | 5          | LocalTimeExecuted   | Local Time Executed             | NULL         | 1         | 1        |
| 59                | 16           | 16         | UNITTYPE            | Unit type                       | NULL         | 0         | 1        |
| 60                | 16           | 16         | BEGINROOM           | Begin room                      | NULL         | 0         | 1        |
| 61                | 16           | 16         | ENDROOM             | End room                        | NULL         | 0         | 1        |
| 62                | 16           | 16         | SORT                | Sort                            | NULL         | 0         | 1        |
| 63                | 17           | 5          | LocalTimeExecuted   | Local Time Executed             | NULL         | 1         | 1        |
| 64                | 17           | 16         | UNITTYPE            | Unit type                       | NULL         | 0         | 1        |
| 65                | 17           | 9          | ParentID            | Parent Identifier Code          | NULL         | 0         | 1        |
| 66                | 17           | 16         | PriceOne            | Price one                       | NULL         | 0         | 1        |
| 67                | 17           | 16         | PriceTwo            | Price two                       | NULL         | 0         | 1        |
| 68                | 17           | 16         | PriceThree          | Price three                     | NULL         | 0         | 1        |
| 69                | 17           | 16         | PointSpread         | Points spread                   | NULL         | 1         | 1        |
| 70                | 17           | 16         | CaregiverWage       | Care giver wage                 | NULL         | 1         | 1        |
| 71                | 17           | 16         | DaysPerMonth        | Days per month                  | NULL         | 1         | 1        |
| 72                | 18           | 5          | LocalTimeExecuted   | Local Time Executed             | NULL         | 1         | 1        |
| 73                | 18           | 16         | UNITTYPE            | Unit type                       | NULL         | 0         | 1        |
| 74                | 18           | 9          | ParentID            | Parent Identifier Code          | NULL         | 0         | 1        |
| 75                | 18           | 16         | PriceOne            | Price one                       | NULL         | 0         | 1        |
| 76                | 18           | 16         | PriceTwo            | Price two                       | NULL         | 0         | 1        |
| 77                | 18           | 16         | PriceThree          | Price three                     | NULL         | 0         | 1        |
| 78                | 18           | 16         | PointSpread         | Points spread                   | NULL         | 1         | 1        |
| 79                | 18           | 16         | CaregiverWage       | Care giver wage                 | NULL         | 1         | 1        |
| 80                | 18           | 16         | DaysPerMonth        | Days per month                  | NULL         | 1         | 1        |
| 81                | 19           | 5          | LocalTimeExecuted   | Local Time Executed             | NULL         | 1         | 1        |
| 82                | 19           | 16         | UNITTYPE            | Unit type                       | NULL         | 0         | 1        |
| 83                | 19           | 9          | ParentID            | Parent Identifier Code          | NULL         | 0         | 1        |
| 84                | 19           | 16         | PriceOne            | Price one                       | NULL         | 0         | 1        |
| 85                | 19           | 16         | PriceTwo            | Price two                       | NULL         | 0         | 1        |
| 86                | 19           | 16         | PriceThree          | Price three                     | NULL         | 0         | 1        |
| 87                | 19           | 16         | PointSpread         | Points spread                   | NULL         | 1         | 1        |
| 88                | 19           | 16         | CaregiverWage       | Care giver wage                 | NULL         | 1         | 1        |
| 89                | 19           | 16         | DaysPerMonth        | Days per month                  | NULL         | 1         | 1        |
| 90                | 19           | 10         | LevelZeroMax        | Level Zero Max                  | NULL         | 1         | 1        |
| 91                | 20           | 5          | LocalTimeExecuted   | Local Time Executed             | NULL         | 1         | 1        |
| 92                | 20           | 16         | UNITTYPE            | Unit type                       | NULL         | 0         | 1        |
| 93                | 20           | 9          | ParentID            | Parent Identifier Code          | NULL         | 0         | 1        |
| 94                | 20           | 16         | PriceOne            | Price one                       | NULL         | 0         | 1        |
| 95                | 20           | 16         | PriceTwo            | Price two                       | NULL         | 0         | 1        |
| 96                | 20           | 16         | PriceThree          | Price three                     | NULL         | 0         | 1        |
| 97                | 20           | 16         | PointSpread         | Points spread                   | NULL         | 1         | 1        |
| 98                | 20           | 16         | CaregiverWage       | Care giver wage                 | NULL         | 1         | 1        |
| 99                | 20           | 16         | DaysPerMonth        | Days per month                  | NULL         | 1         | 1        |
| 100               | 21           | 5          | LocalTimeExecuted   | Local Time Executed             | NULL         | 1         | 1        |
| 101               | 21           | 16         | UNITTYPE            | Unit type                       | NULL         | 0         | 1        |
| 102               | 21           | 9          | ParentID            | Parent Identifier Code          | NULL         | 0         | 1        |
| 103               | 21           | 16         | PriceOne            | Price one                       | NULL         | 0         | 1        |
| 104               | 21           | 16         | PriceTwo            | Price two                       | NULL         | 0         | 1        |
| 105               | 21           | 16         | PriceThree          | Price three                     | NULL         | 0         | 1        |
| 106               | 21           | 16         | PointSpread         | Points spread                   | NULL         | 1         | 1        |
| 107               | 21           | 16         | CaregiverWage       | Care giver wage                 | NULL         | 1         | 1        |
| 108               | 21           | 16         | DaysPerMonth        | Days per month                  | NULL         | 1         | 1        |
| 109               | 21           | 10         | Level0Max           | Level 0 Max                     | NULL         | 1         | 1        |
| 110               | 21           | 10         | Level1Max           | Level 1 Max                     | NULL         | 1         | 1        |
| 111               | 21           | 10         | Level2Max           | Level 2 Max                     | NULL         | 1         | 1        |
| 112               | 21           | 10         | Level3Max           | Level 3 Max                     | NULL         | 1         | 1        |
| 113               | 21           | 10         | Level4Max           | Level 4 Max                     | NULL         | 1         | 1        |
| 114               | 22           | 5          | LocalTimeExecuted   | Local Time Executed             | NULL         | 1         | 1        |
| 115               | 22           | 16         | UNITTYPE            | Unit type                       | NULL         | 0         | 1        |
| 116               | 22           | 16         | BEGINROOM           | Begin room                      | NULL         | 0         | 1        |
| 117               | 22           | 16         | ENDROOM             | End room                        | NULL         | 0         | 1        |
| 118               | 22           | 16         | SORT                | Sort                            | NULL         | 0         | 1        |
| 119               | 22           | 9          | UserID              | User identifier code            | NULL         | 1         | 1        |
| 120               | 23           | 9          | FacilityID          | Facility Identifier Code        | NULL         | 1         | 1        |
| 122               | 23           | 9          | ParentFacilityID    | Parent Facility Identifier Code | NULL         | 1         | 1        |
| 123               | 24           | 9          | ParentFacilityID    | Parent Facility Identifier Code | NULL         | 1         | 1        |
| 200               | 25           | 9          | FacilityID          | Facility Identifier Code        | NULL         | 1         | 1        |
| 201               | 25           | 5          | ExceptionStartDate  | Exception Start Date            | NULL         | 1         | 1        |
| 202               | 25           | 5          | ExceptionEndDate    | Exception End Date              | NULL         | 1         | 1        |
| 203               | 25           | 10         | ShiftID             | Shift identifier code           | NULL         | 0         | 1        |
| 204               | 25           | 16         | RoomNumber          | Room Number                     | NULL         | 0         | 1        |
| 205               | 25           | 10         | ResolutionID        | Resolution identifier code      | NULL         | 0         | 1        |
| 206               | 25           | 1          | SortByResident      | Sort By Resident flag           | FALSE        | 0         | 1        |
| 207               | 25           | 1          | SortByStaff         | Sort By Staff flag              | FALSE        | 0         | 1        |
| 208               | 25           | 1          | SortByShift         | Sort By Shift flag              | FALSE        | 0         | 1        |
| 209               | 25           | 1          | SortByReason        | Sort By Reason flag             | FALSE        | 0         | 1        |
| 210               | 26           | 9          | FacilityID          | Facility Identifier Code        | NULL         | 1         | 1        |
| 211               | 26           | 5          | CompletionStartDate | Completion Start Date           | NULL         | 1         | 1        |
| 212               | 26           | 5          | CompletionEndDate   | Completion End Date             | NULL         | 0         | 1        |
| 213               | 26           | 10         | ShiftID             | Shift identifier code           | NULL         | 0         | 1        |
| 214               | 26           | 16         | RoomNumber          | Room Number                     | NULL         | 0         | 1        |
| 215               | 26           | 1          | SortByResident      | Sort By Resident flag           | FALSE        | 0         | 1        |
| 216               | 26           | 1          | SortByStaff         | Sort By Staff flag              | FALSE        | 0         | 1        |
| 217               | 26           | 1          | SortByShift         | Sort By Shift flag              | FALSE        | 0         | 1        |
| 218               | 26           | 1          | SortByReason        | Sort By Reason flag             | FALSE        | 0         | 1        |
| 219               | 26           | 1          | SortByTimeStamp     | Sort By TimeStamp flag          | FALSE        | 0         | 1        |
| 220               | 100          | 1          | Id                  | Identifier code                 | FALSE        | 0         | 1        |
| 222               | 101          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 223               | 101          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 224               | 101          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 225               | 102          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 226               | 102          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 227               | 102          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 228               | 103          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 229               | 103          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 230               | 103          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 231               | 103          | 16         | FacilityState       | FacilityState                   | NULL         | 1         | 1        |
| 232               | 104          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 233               | 104          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 234               | 104          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 235               | 104          | 16         | FacilityState       | FacilityState                   | NULL         | 1         | 1        |
| 236               | 105          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 237               | 105          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 238               | 105          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 239               | 105          | 16         | FacilityState       | FacilityState                   | NULL         | 1         | 1        |
| 240               | 106          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 241               | 106          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 242               | 106          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 243               | 107          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 244               | 107          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 245               | 107          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 246               | 107          | 16         | FacilityState       | FacilityState                   | NULL         | 1         | 1        |
| 247               | 108          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 248               | 108          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 249               | 108          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 250               | 109          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 251               | 109          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 252               | 109          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 253               | 110          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 254               | 110          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 255               | 110          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 256               | 111          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 257               | 111          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 258               | 111          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 259               | 112          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 260               | 112          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 261               | 112          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 262               | 113          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 263               | 113          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 264               | 113          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 265               | 114          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 266               | 114          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 267               | 114          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 268               | 115          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 269               | 115          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 270               | 115          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 271               | 116          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 272               | 116          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 273               | 116          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 274               | 117          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 275               | 117          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 276               | 117          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 277               | 118          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 278               | 118          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 279               | 118          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 280               | 119          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 281               | 119          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 282               | 119          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 283               | 120          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 284               | 120          | 16         | FacilityId          | FacilityId                      | NULL         | 0         | 1        |
| 285               | 121          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 286               | 121          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 287               | 121          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 288               | 122          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 289               | 122          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 290               | 122          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 291               | 123          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 292               | 123          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 293               | 123          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 294               | 124          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 295               | 124          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 296               | 124          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 297               | 124          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 298               | 124          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 299               | 124          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 300               | 125          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 301               | 125          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 302               | 125          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 303               | 125          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 304               | 125          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 305               | 125          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 306               | 126          | 5          | StartDate           | StartDate                       | NULL         | 0         | 1        |
| 307               | 126          | 5          | EndDate             | EndDate                         | NULL         | 0         | 1        |
| 308               | 126          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 309               | 126          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 310               | 126          | 5          | TimeBegin           | TimeBegin                       | NULL         | 0         | 1        |
| 311               | 126          | 5          | TimeEnd             | TimeEnd                         | NULL         | 0         | 1        |
| 312               | 126          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 313               | 126          | 1          | ReportingToState    | ReportingToState                | NULL         | 0         | 1        |
| 314               | 127          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 315               | 127          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 316               | 127          | 16         | SimplifiedType      | SimplifiedType                  | NULL         | 1         | 1        |
| 317               | 128          | 5          | StartDate           | StartDate                       | NULL         | 0         | 1        |
| 318               | 128          | 5          | EndDate             | EndDate                         | NULL         | 0         | 1        |
| 319               | 128          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 320               | 128          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 321               | 128          | 5          | TimeBegin           | TimeBegin                       | NULL         | 0         | 1        |
| 322               | 128          | 5          | TimeEnd             | TimeEnd                         | NULL         | 0         | 1        |
| 323               | 128          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 324               | 128          | 1          | ReportingToState    | ReportingToState                | NULL         | 0         | 1        |
| 325               | 128          | 16         | TimeFrame           | TimeFrame                       | NULL         | 1         | 1        |
| 326               | 129          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 327               | 129          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 328               | 129          | 10         | IncidentID          | IncidentID                      | NULL         | 1         | 1        |
| 329               | 130          | 5          | StartDate           | StartDate                       | NULL         | 0         | 1        |
| 330               | 130          | 5          | EndDate             | EndDate                         | NULL         | 0         | 1        |
| 331               | 130          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 332               | 131          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 333               | 131          | 10         | IncidentID          | IncidentID                      | NULL         | 0         | 1        |
| 334               | 131          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 335               | 132          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 336               | 132          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 337               | 133          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 338               | 134          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 339               | 134          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 340               | 135          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 341               | 135          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 342               | 135          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 343               | 135          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 344               | 135          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 345               | 135          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 346               | 136          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 347               | 136          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 348               | 136          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 349               | 136          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 350               | 136          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 351               | 136          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 352               | 137          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 353               | 137          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 354               | 137          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 355               | 137          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 356               | 137          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 357               | 137          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 358               | 138          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 359               | 138          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 360               | 138          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 361               | 138          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 362               | 138          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 363               | 138          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 364               | 139          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 365               | 139          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 366               | 139          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 367               | 139          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 368               | 139          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 369               | 139          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 370               | 140          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 371               | 140          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 372               | 140          | 16         | ParentID            | ParentID                        | NULL         | 1         | 1        |
| 373               | 140          | 16         | PriceOne            | PriceOne                        | NULL         | 1         | 1        |
| 374               | 140          | 16         | PriceTwo            | PriceTwo                        | NULL         | 1         | 1        |
| 375               | 140          | 16         | PriceThree          | PriceThree                      | NULL         | 1         | 1        |
| 376               | 140          | 16         | PointSpread         | PointSpread                     | NULL         | 1         | 1        |
| 377               | 140          | 8          | CaregiverWage       | CaregiverWage                   | NULL         | 1         | 1        |
| 378               | 140          | 16         | DaysPerMonth        | DaysPerMonth                    | NULL         | 1         | 1        |
| 379               | 140          | 8          | CareEfficiency      | CareEfficiency                  | NULL         | 1         | 1        |
| 380               | 140          | 10         | LevelZeroMax        | LevelZeroMax                    | NULL         | 1         | 1        |
| 381               | 141          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 382               | 141          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 383               | 141          | 16         | ParentID            | ParentID                        | NULL         | 1         | 1        |
| 384               | 141          | 16         | PriceOne            | PriceOne                        | NULL         | 1         | 1        |
| 385               | 141          | 16         | PriceTwo            | PriceTwo                        | NULL         | 1         | 1        |
| 386               | 141          | 16         | PriceThree          | PriceThree                      | NULL         | 1         | 1        |
| 387               | 141          | 16         | PointSpread         | PointSpread                     | NULL         | 1         | 1        |
| 388               | 141          | 8          | CaregiverWage       | CaregiverWage                   | NULL         | 1         | 1        |
| 389               | 141          | 16         | DaysPerMonth        | DaysPerMonth                    | NULL         | 1         | 1        |
| 390               | 141          | 8          | CareEfficiency      | CareEfficiency                  | NULL         | 1         | 1        |
| 391               | 141          | 10         | LevelZeroMax        | LevelZeroMax                    | NULL         | 1         | 1        |
| 392               | 141          | 16         | NumLevels           | NumLevels                       | NULL         | 1         | 1        |
| 393               | 142          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 394               | 142          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 395               | 142          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 396               | 142          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 397               | 142          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 398               | 142          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 399               | 143          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 400               | 143          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 401               | 143          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 402               | 143          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 403               | 143          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 404               | 143          | 16         | UserID              | UserID                          | NULL         | 1         | 1        |
| 405               | 144          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 406               | 144          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 407               | 144          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 408               | 144          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 409               | 144          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 410               | 144          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 411               | 145          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 412               | 145          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 413               | 145          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 414               | 145          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 415               | 145          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 416               | 145          | 16         | ParentID            | ParentID                        | NULL         | 0         | 1        |
| 417               | 146          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 418               | 146          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 419               | 146          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 420               | 146          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 421               | 146          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 422               | 146          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 423               | 147          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 424               | 147          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 425               | 147          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 426               | 147          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 427               | 147          | 16         | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 428               | 148          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 429               | 148          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 430               | 148          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 431               | 149          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 432               | 150          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 433               | 150          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 434               | 150          | 10         | AppraisalID         | AppraisalID                     | NULL         | 0         | 1        |
| 435               | 151          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 436               | 151          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 437               | 151          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 438               | 151          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 439               | 151          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 440               | 151          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 441               | 152          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 442               | 152          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 443               | 153          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 444               | 153          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 445               | 153          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 446               | 154          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 447               | 155          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 448               | 155          | 16         | FacilityId          | FacilityId                      | NULL         | 0         | 1        |
| 449               | 156          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 450               | 156          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 451               | 156          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 452               | 157          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 453               | 157          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 454               | 157          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 455               | 157          | 16         | MonthYear           | MonthYear                       | NULL         | 1         | 1        |
| 456               | 158          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 457               | 158          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 458               | 158          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 459               | 158          | 16         | MonthYear           | MonthYear                       | NULL         | 1         | 1        |
| 460               | 161          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 461               | 161          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 462               | 161          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 463               | 162          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 464               | 162          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 465               | 162          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 466               | 162          | 10         | AssessmentID        | AssessmentID                    | NULL         | 1         | 1        |
| 467               | 163          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 468               | 163          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 469               | 163          | 10         | IncidentID          | IncidentID                      | NULL         | 1         | 1        |
| 470               | 164          | 10         | ResidentID          | ResidentID                      | NULL         | 0         | 1        |
| 471               | 164          | 16         | RoomBegin           | RoomBegin                       | NULL         | 0         | 1        |
| 472               | 164          | 16         | RoomEnd             | RoomEnd                         | NULL         | 0         | 1        |
| 473               | 164          | 16         | ServicesType        | ServicesType                    | NULL         | 0         | 1        |
| 474               | 164          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 475               | 165          | 10         | ResidentID          | ResidentID                      | NULL         | 0         | 1        |
| 476               | 165          | 16         | RoomBegin           | RoomBegin                       | NULL         | 0         | 1        |
| 477               | 165          | 16         | RoomEnd             | RoomEnd                         | NULL         | 0         | 1        |
| 478               | 165          | 16         | ServicesType        | ServicesType                    | NULL         | 0         | 1        |
| 479               | 165          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 480               | 166          | 10         | ResidentID          | ResidentID                      | NULL         | 0         | 1        |
| 481               | 166          | 16         | RoomBegin           | RoomBegin                       | NULL         | 0         | 1        |
| 482               | 166          | 16         | RoomEnd             | RoomEnd                         | NULL         | 0         | 1        |
| 483               | 166          | 16         | ServicesType        | ServicesType                    | NULL         | 0         | 1        |
| 484               | 166          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 485               | 166          | 5          | StartDate           | StartDate                       | NULL         | 1         | 1        |
| 486               | 167          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 487               | 167          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 488               | 167          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 489               | 167          | 16         | MonthYear           | MonthYear                       | NULL         | 1         | 1        |
| 490               | 168          | 16         | RESIDENTID          | RESIDENTID                      | NULL         | 0         | 1        |
| 491               | 168          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 492               | 168          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 493               | 168          | 5          | DateFromFilter      | DateFromFilter                  | NULL         | 0         | 1        |
| 494               | 168          | 5          | DateToFilter        | DateToFilter                    | NULL         | 0         | 1        |
| 495               | 168          | 16         | TopicFilter         | TopicFilter                     | NULL         | 0         | 1        |
| 496               | 168          | 16         | NotesFilter         | NotesFilter                     | NULL         | 0         | 1        |
| 497               | 169          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 498               | 169          | 10         | ResidentID          | ResidentID                      | NULL         | 0         | 1        |
| 499               | 169          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 500               | 170          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 501               | 170          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 502               | 171          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 503               | 171          | 10         | ResidentID          | ResidentID                      | NULL         | 0         | 1        |
| 504               | 171          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 505               | 171          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 506               | 172          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 507               | 172          | 10         | ResidentID          | ResidentID                      | NULL         | 0         | 1        |
| 508               | 172          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 509               | 173          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 510               | 173          | 16         | ROOMNUM             | ROOMNUM                         | NULL         | 0         | 1        |
| 511               | 173          | 16         | RESIDENTID          | RESIDENTID                      | NULL         | 0         | 1        |
| 512               | 173          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 513               | 173          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 514               | 173          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 515               | 173          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 516               | 174          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 517               | 174          | 16         | ROOMNUM             | ROOMNUM                         | NULL         | 0         | 1        |
| 518               | 174          | 16         | RESIDENTID          | RESIDENTID                      | NULL         | 0         | 1        |
| 519               | 174          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 520               | 174          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 521               | 174          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 522               | 174          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 523               | 175          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 524               | 175          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 525               | 175          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 526               | 176          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 527               | 176          | 10         | ResidentID          | ResidentID                      | NULL         | 0         | 1        |
| 528               | 176          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 529               | 176          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 530               | 177          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 531               | 177          | 10         | ResidentID          | ResidentID                      | NULL         | 0         | 1        |
| 532               | 177          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 533               | 178          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 534               | 178          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 535               | 178          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 536               | 179          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 537               | 179          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 538               | 179          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 539               | 180          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 540               | 180          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 541               | 180          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 542               | 181          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 543               | 181          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 544               | 181          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 545               | 181          | 16         | MonthYear           | MonthYear                       | NULL         | 1         | 1        |
| 546               | 182          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 547               | 182          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 548               | 182          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 549               | 182          | 16         | MonthYear           | MonthYear                       | NULL         | 1         | 1        |
| 550               | 183          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 551               | 183          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 552               | 183          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 553               | 183          | 16         | SORT                | SORT                            | NULL         | 1         | 1        |
| 554               | 184          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 555               | 184          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 556               | 184          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 557               | 184          | 16         | MonthYear           | MonthYear                       | NULL         | 1         | 1        |
| 558               | 184          | 16         | ReturnInstructions  | ReturnInstructions              | NULL         | 1         | 1        |
| 559               | 185          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 560               | 185          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 561               | 185          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 562               | 186          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 563               | 186          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 564               | 186          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 565               | 186          | 16         | StartDate           | StartDate                       | NULL         | 1         | 1        |
| 566               | 186          | 16         | EndDate             | EndDate                         | NULL         | 1         | 1        |
| 567               | 188          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 568               | 188          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 569               | 188          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 570               | 188          | 16         | MonthYear           | MonthYear                       | NULL         | 1         | 1        |
| 571               | 189          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 572               | 189          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 573               | 189          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 574               | 189          | 16         | MonthYear           | MonthYear                       | NULL         | 1         | 1        |
| 575               | 190          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 576               | 190          | 16         | ROOMNUM             | ROOMNUM                         | NULL         | 0         | 1        |
| 577               | 190          | 16         | RESIDENTID          | RESIDENTID                      | NULL         | 0         | 1        |
| 578               | 190          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 579               | 190          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 580               | 190          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 581               | 190          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 582               | 191          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 583               | 191          | 16         | ROOMNUM             | ROOMNUM                         | NULL         | 0         | 1        |
| 584               | 191          | 16         | RESIDENTID          | RESIDENTID                      | NULL         | 0         | 1        |
| 585               | 191          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 586               | 191          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 587               | 191          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 588               | 191          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 589               | 192          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 590               | 192          | 16         | ROOMNUM             | ROOMNUM                         | NULL         | 0         | 1        |
| 591               | 192          | 16         | RESIDENTID          | RESIDENTID                      | NULL         | 0         | 1        |
| 592               | 192          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 593               | 192          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 594               | 192          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 595               | 192          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 596               | 193          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 597               | 193          | 16         | ROOMNUM             | ROOMNUM                         | NULL         | 0         | 1        |
| 598               | 193          | 16         | RESIDENTID          | RESIDENTID                      | NULL         | 0         | 1        |
| 599               | 193          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 600               | 193          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 601               | 193          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 602               | 193          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 603               | 194          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 604               | 194          | 16         | ROOMNUM             | ROOMNUM                         | NULL         | 0         | 1        |
| 605               | 194          | 16         | RESIDENTID          | RESIDENTID                      | NULL         | 0         | 1        |
| 606               | 194          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 607               | 194          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 608               | 194          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 609               | 194          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 610               | 195          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 611               | 195          | 10         | Month               | Month                           | NULL         | 0         | 1        |
| 612               | 195          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 613               | 196          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 614               | 196          | 10         | Month               | Month                           | NULL         | 0         | 1        |
| 615               | 196          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 616               | 197          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 617               | 197          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 618               | 197          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 619               | 197          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 620               | 197          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 621               | 197          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 622               | 198          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 623               | 198          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 624               | 198          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 625               | 199          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 626               | 199          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 627               | 199          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 628               | 199          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 629               | 199          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 630               | 199          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 631               | 200          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 632               | 200          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 633               | 200          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 634               | 201          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 635               | 201          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 636               | 201          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 637               | 201          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 638               | 201          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 639               | 201          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 640               | 202          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 641               | 202          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 642               | 202          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 643               | 202          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 644               | 202          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 645               | 202          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 646               | 203          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 647               | 203          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 648               | 203          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 649               | 203          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 650               | 203          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 651               | 203          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 652               | 204          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 653               | 204          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 654               | 204          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 655               | 205          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 656               | 205          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 657               | 205          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 658               | 205          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 659               | 205          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 660               | 205          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 661               | 206          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 662               | 206          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 663               | 206          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 664               | 207          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 665               | 207          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 666               | 207          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 667               | 207          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 668               | 207          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 669               | 207          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 670               | 208          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 671               | 208          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 672               | 208          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 673               | 208          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 674               | 208          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 675               | 208          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 676               | 209          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 677               | 209          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 678               | 209          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 679               | 209          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 680               | 209          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 681               | 209          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 682               | 210          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 683               | 210          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 684               | 210          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 685               | 210          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 686               | 210          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 687               | 210          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 688               | 211          | 16         | ID                  | ID                              | NULL         | 0         | 1        |
| 689               | 211          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 690               | 211          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 691               | 212          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 692               | 213          | 16         | ID                  | ID                              | NULL         | 0         | 1        |
| 693               | 213          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 694               | 213          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 695               | 214          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 696               | 214          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 697               | 214          | 16         | RoomBegin           | RoomBegin                       | NULL         | 0         | 1        |
| 698               | 214          | 16         | RoomEnd             | RoomEnd                         | NULL         | 0         | 1        |
| 699               | 214          | 16         | ServicesType        | ServicesType                    | NULL         | 0         | 1        |
| 700               | 215          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 701               | 215          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 702               | 215          | 16         | RoomBegin           | RoomBegin                       | NULL         | 0         | 1        |
| 703               | 215          | 16         | RoomEnd             | RoomEnd                         | NULL         | 0         | 1        |
| 704               | 215          | 16         | ServicesType        | ServicesType                    | NULL         | 0         | 1        |
| 705               | 216          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 706               | 216          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 707               | 216          | 16         | RoomBegin           | RoomBegin                       | NULL         | 0         | 1        |
| 708               | 216          | 16         | RoomEnd             | RoomEnd                         | NULL         | 0         | 1        |
| 709               | 216          | 16         | ServicesType        | ServicesType                    | NULL         | 0         | 1        |
| 710               | 217          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 711               | 217          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 712               | 217          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 713               | 217          | 16         | ROOMNUM             | ROOMNUM                         | NULL         | 0         | 1        |
| 714               | 217          | 16         | RESIDENTID          | RESIDENTID                      | NULL         | 0         | 1        |
| 715               | 217          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 716               | 217          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 717               | 218          | 16         | ID                  | ID                              | NULL         | 0         | 1        |
| 718               | 218          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 719               | 218          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 720               | 219          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 721               | 219          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 722               | 219          | 10         | PlanID              | PlanID                          | NULL         | 1         | 1        |
| 723               | 219          | 10         | ID                  | ID                              | NULL         | 1         | 1        |
| 724               | 220          | 16         | ID                  | ID                              | NULL         | 0         | 1        |
| 725               | 220          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 726               | 220          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 727               | 221          | 16         | ID                  | ID                              | NULL         | 0         | 1        |
| 728               | 221          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 729               | 221          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 730               | 222          | 16         | ID                  | ID                              | NULL         | 0         | 1        |
| 731               | 222          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 732               | 222          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 733               | 223          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 734               | 224          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 735               | 224          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 736               | 224          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 737               | 224          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 738               | 224          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 739               | 224          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 740               | 225          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 741               | 225          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 742               | 225          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 743               | 225          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 744               | 225          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 745               | 225          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 746               | 226          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 747               | 226          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 748               | 226          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 749               | 227          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 750               | 227          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 751               | 227          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 752               | 228          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 753               | 228          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 754               | 228          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 755               | 228          | 16         | MonthYear           | MonthYear                       | NULL         | 1         | 1        |
| 756               | 229          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 757               | 229          | 10         | ResidentID          | ResidentID                      | NULL         | 1         | 1        |
| 758               | 229          | 16         | FacilityID          | FacilityID                      | NULL         | 1         | 1        |
| 759               | 229          | 16         | MonthYear           | MonthYear                       | NULL         | 1         | 1        |
| 760               | 230          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 761               | 230          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 762               | 230          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 763               | 230          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 764               | 230          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 765               | 230          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 766               | 231          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 767               | 231          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 768               | 231          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 769               | 231          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 770               | 231          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 771               | 231          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 772               | 232          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
| 773               | 232          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 774               | 232          | 16         | SORT                | SORT                            | NULL         | 0         | 1        |
| 775               | 232          | 16         | UNITTYPE            | UNITTYPE                        | NULL         | 0         | 1        |
| 776               | 232          | 16         | BEGINROOM           | BEGINROOM                       | NULL         | 0         | 1        |
| 777               | 232          | 16         | ENDROOM             | ENDROOM                         | NULL         | 0         | 1        |
| 778               | 233          | 16         | FacilityID          | FacilityID                      | NULL         | 0         | 1        |
| 779               | 233          | 5          | LocalTimeExecuted   | LocalTimeExecuted               | NULL         | 1         | 1        |
