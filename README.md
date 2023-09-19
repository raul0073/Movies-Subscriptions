
```
REACT_Final
├─ App
│  ├─ app
│  ├─ favicon.png
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  ├─ README.md
│  ├─ src
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  ├─ 403
│  │  │  │  └─ ErrorIcon.jsx
│  │  │  ├─ bg
│  │  │  │  └─ Entry
│  │  │  │     └─ dark.jpg
│  │  │  ├─ Components
│  │  │  │  ├─ Button
│  │  │  │  │  ├─ CheckIcon.jsx
│  │  │  │  │  ├─ ErrorIcon.jsx
│  │  │  │  │  └─ LoadingIcon.jsx
│  │  │  │  ├─ Login
│  │  │  │  │  ├─ ForgotIcon.jsx
│  │  │  │  │  └─ LoginIcon.jsx
│  │  │  │  ├─ MemberBox
│  │  │  │  │  ├─ AddSubscriptionIcon.jsx
│  │  │  │  │  ├─ DeleteIcon.jsx
│  │  │  │  │  ├─ EditIcon.jsx
│  │  │  │  │  ├─ iconmonstr-candy-15-32.png
│  │  │  │  │  ├─ iconmonstr-crosshair-10-32.png
│  │  │  │  │  └─ iconmonstr-email-15-32.png
│  │  │  │  ├─ Search
│  │  │  │  │  └─ SearchError.jsx
│  │  │  │  └─ Topbar
│  │  │  │     ├─ HomeIcon.jsx
│  │  │  │     ├─ Logout.jsx
│  │  │  │     ├─ MenuClosedIcon.jsx
│  │  │  │     ├─ MenuOpenIcon.jsx
│  │  │  │     └─ SubscriptionIcon.jsx
│  │  │  ├─ Logo
│  │  │  │  └─ logo3.png
│  │  │  ├─ Members
│  │  │  │  └─ AddMemberIcom.jsx
│  │  │  ├─ MovieBox
│  │  │  │  ├─ HalfStar.jsx
│  │  │  │  └─ Star.jsx
│  │  │  ├─ Pages
│  │  │  │  └─ AddMoviesIcon.jsx
│  │  │  └─ react.svg
│  │  ├─ Atoms.js
│  │  ├─ Components
│  │  │  ├─ Button
│  │  │  │  ├─ ButtonWithLoading.jsx
│  │  │  │  └─ buttonWithLoading.scss
│  │  │  ├─ Error
│  │  │  │  ├─ searchError.jsx
│  │  │  │  └─ searchError.scss
│  │  │  ├─ Search
│  │  │  │  ├─ Search.jsx
│  │  │  │  └─ search.scss
│  │  │  ├─ Subscribers
│  │  │  │  ├─ AllSubscriptionModal
│  │  │  │  │  ├─ modal.scss
│  │  │  │  │  └─ SubscriptionsModal.jsx
│  │  │  │  ├─ Subscriptions.jsx
│  │  │  │  └─ subscriptions.scss
│  │  │  └─ Topbar
│  │  │     ├─ Topbar.jsx
│  │  │     └─ topbar.scss
│  │  ├─ index.scss
│  │  ├─ main.jsx
│  │  ├─ Utilities
│  │  │  ├─ Alerts
│  │  │  │  └─ msgService.jsx
│  │  │  ├─ Auth
│  │  │  │  └─ RouteProtector.jsx
│  │  │  ├─ DB
│  │  │  │  ├─ MembersService.jsx
│  │  │  │  ├─ MoviesService.jsx
│  │  │  │  ├─ SubscriptionsService.jsx
│  │  │  │  └─ UsersService.jsx
│  │  │  ├─ Forms
│  │  │  │  └─ FormsValidation.jsx
│  │  │  ├─ SecureStorage
│  │  │  │  └─ StorageService.jsx
│  │  │  ├─ UI
│  │  │  │  └─ StarsRating.jsx
│  │  │  └─ WS
│  │  │     └─ RestCountriesService.jsx
│  │  └─ Views
│  │     ├─ 403
│  │     │  ├─ 403.scss
│  │     │  └─ AccessError.jsx
│  │     ├─ Entry
│  │     │  ├─ Components
│  │     │  │  ├─ ForgotPassword.jsx
│  │     │  │  ├─ Login.jsx
│  │     │  │  └─ login.scss
│  │     │  ├─ Entry.jsx
│  │     │  └─ entry.scss
│  │     ├─ Home
│  │     │  ├─ Home.jsx
│  │     │  └─ homepage.scss
│  │     ├─ Members
│  │     │  ├─ AddMember.jsx
│  │     │  ├─ AllMembers.jsx
│  │     │  ├─ Components
│  │     │  │  ├─ MemberBox.jsx
│  │     │  │  └─ Styles
│  │     │  │     └─ memberbox.scss
│  │     │  ├─ EditMember.jsx
│  │     │  └─ Styles
│  │     │     └─ members.scss
│  │     └─ Movies
│  │        ├─ AddMovie.jsx
│  │        ├─ AllMovies.jsx
│  │        ├─ Components
│  │        │  ├─ MovieBox.jsx
│  │        │  └─ moviebox.scss
│  │        ├─ Data
│  │        │  └─ genresData.json
│  │        ├─ EditMovie.jsx
│  │        └─ Styles
│  │           ├─ addmovie.scss
│  │           ├─ allmovies.scss
│  │           ├─ editmovie.scss
│  │           └─ moviespage.scss
│  └─ vite.config.js
└─ Server
   ├─ .env
   ├─ BLL
   │  ├─ MembersBLL.js
   │  ├─ MovieBLL.js
   │  ├─ SubscriptionBLL.js
   │  └─ UserBLL.js
   ├─ Configs
   │  └─ db.js
   ├─ main.js
   ├─ Models
   │  ├─ MembersModel.js
   │  ├─ MovieModel.js
   │  ├─ SubscriptionModel.js
   │  └─ UsersModel.js
   ├─ package-lock.json
   ├─ package.json
   ├─ README.md
   └─ Routes
      ├─ MembersRoute.js
      ├─ MoviesRoute.js
      ├─ SubscriptionRoute.js
      └─ UsersRoute.js

```