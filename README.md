# Food Ordering App 🍕

React-Native (Expo) application for Android & iOS that allows to order products, and includes administrative version for content management as well.

## Creating

This project was generated with with **[Create Expo App](https://docs.expo.dev/tutorial/create-your-first-app/)** using `Navigation (Typescript)` template. Navigation system consists of (admin) and (user) routing groups and also includes nested tab-navigation (`react-navigation`).

User authentication, data storing and CRUD operations were implemented using **[Supabase](https://supabase.com/)** (as backend service) and **[React-Query](https://tanstack.com/query/latest)** (requests and processing).

## Key Features

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExamwxYncxMHo4ejkyMmp3eDliajljMDZrM2xsanRzNmc3MHQ1YmdmbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fr9b0kxacZgbCAjCfe/giphy.gif)

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcW91MnNmeWQ0OWdpYW9wYWc3MXB1dmo2NmVjbHB6Mmt0cjlpYTlvbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9Id1qY8OQxr7OW1MEi/giphy.gif)

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnkzN3BpdDQ1ZmIya3EwYjF6cGhzMGxybWRwaG5tNmN4ZmY5dTM3dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wT3aV27fmmIZitsp43/giphy.gif)

- User Authentication
- Different `user` and `admin` UI
- Creating and editing products by admin
- Adding products to the Cart and ordering
- Payment system with **[Stripe](https://stripe.com/)**
- Updating order status by admin
- Real-time update for order information
- Notifications by `expo-notifications` | (for now in emulator only)

## Technologies

- Expo
- React-Native
- React-Query
- Supabase
- Stripe
- dayjs

...full list of dependencies is available in `package.json` file.
