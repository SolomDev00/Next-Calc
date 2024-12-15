# NextCalc

🚀 **[Live Demo](https://nextgen-todos.vercel.app/)**

> An advanced web application to create, save, and manage interactive charts with ease.

---

## 🌟 Features

- **Multi-chart Support:** Create various chart types: Line, Wave, Pie, Celsius, Bar, and Radar.
- **Dynamic Input:** Add labels (x-axis) and values (y-axis) for your charts dynamically.
- **Save and View:** Save charts to the IndexedDB and revisit them via the **Recent Charts** page.
- **User Authentication:** Login using Clerk with email, Facebook, GitHub, or LinkedIn.
- **Responsive UI:** A clean, user-friendly interface with smooth interactions.

---

## 📂 Project Structure

```
📁 src
   ├── 📂 components        # Reusable UI components
   ├── 📂 pages             # Main pages (Home, Recent Charts)
   ├── 📂 assets            # Static files (images/icons)
   ├── 📂 database          # IndexedDB utilities
   ├── 📂 hooks             # Custom React hooks
   ├── 📂 styles            # Tailwind CSS files
   └── 📂 utils             # Helper functions and constants
```

---

## 🛠️ Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS
- **Charts:** Recharts
- **State Management:** React Context API
- **Authentication:** Clerk
- **Database:** IndexedDB (via `idb` library)
- **Other Libraries:**
  - `react-select` for dropdowns
  - `react-tooltip` for tooltips
  - `react-hot-toast` for notifications

---

## 📖 Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/SolomDev00/Next-Calc.git
   cd Next-Calc
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```

3. **Run the Development Server**
   ```bash
   yarn dev
   ```

4. **Build for Production**
   ```bash
   yarn build
   ```

---

## 🔧 Usage

1. **Login**: Use email, Facebook, GitHub, or LinkedIn to log in via Clerk.
2. **Create Charts**:
   - Select a chart type from the dropdown (Line, Wave, Pie, etc.).
   - Input a label (x-axis) and a value (y-axis).
   - Press **Enter** to add data points.
3. **Save Charts**: Click the **Save** button to store charts in IndexedDB.
4. **View Recent Charts**: Navigate to the **Recent Charts** page to see saved charts with timestamps, titles, and descriptions.

---

## 🌍 Live Example

Try it out here: **[Live Demo](https://nextgen-todos.vercel.app)**

---

## 🐛 Known Issues

- [ ] Add support for custom color themes.
- [ ] Improve error handling for empty inputs.
- [ ] Optimize IndexedDB operations for large datasets.

---

## 👨‍💻 Contribution

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m "Add YourFeature"`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a pull request.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## ✨ Acknowledgments

- Thanks to **Clerk** for seamless authentication.
- **IndexedDB** for client-side storage.
- The amazing **React** and **Recharts** communities for inspiration and resources.

---
