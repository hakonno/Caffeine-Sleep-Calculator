# Caffeine & Sleep Calculator

## Overview
The **Caffeine & Sleep Calculator** is a web application designed to help users optimize their caffeine intake to improve sleep quality. By entering details like bedtime (weight, age, tolerance coming soon) the calculator provides a personalized cutoff time for consuming caffeine. The tool aims to promote better sleep/caffeine habits by using scientific findings, and present it in a simple, UX-friendly way.

## Features

### Current Features
- **Personalized Caffeine Cutoff:** Calculates the latest time you can consume caffeine based on your input bedtime.
- **Dark Mode:** Toggle between light and dark themes for a comfortable user experience.
- **Responsive Design:** Works seamlessly across devices, from mobile to desktop.
- **Educational Content:** Includes information on how caffeine affects sleep and tips for better sleep hygiene.
- **Feedback Section:** Users can provide feedback to improve the app.

### Confirmed Upcoming Features
- **Drink Selection:** Input specific drinks (e.g., coffee, energy drinks) to calculate caffeine levels.
- **Advanced Calculations:** Account for additional parameters like caffeine tolerance and time since last caffeine intake.

### Wishlist Features
- **Graphs:** Visualize caffeine metabolism and its impact on your body over time.
- **Customizable Sleep Goals:** Tailor recommendations to unique sleep schedules.
- **Multi-language Support:** Make the tool accessible to a global audience.

## How It Works
The calculator uses a simple formula (for now):
1. Subtract 6 hours (default) from your input bedtime to estimate the caffeine cutoff time.
2. Display the result in 24-hour or 12-hour format based on user preference.
3. Educate users about caffeine's half-life and how it affects the body.

### Example
If you plan to sleep at 11:00 PM:
- The calculator suggests avoiding caffeine after **5:00 PM** (6 hours before bedtime).

## Tech Stack
- **HTML:** For structuring the content.
- **CSS:** For styling and responsive design.
- **JavaScript:** For interactive functionality and calculations.

## Getting Started

### Prerequisites
Ensure you have a web browser and a basic text editor if you wish to modify the code.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/hakonhk/caffeine-sleep-calculator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd caffeine-sleep-calculator
   ```
3. Open `calculator.html` in your preferred web browser.

### Usage
1. Enter your bedtime, weight, and age in the provided fields.
2. Click the **Calculate Cutoff Time** button.
3. View your personalized recommendation for caffeine cutoff time.

## Screenshots
![Screenshot 1](https://via.placeholder.com/400x300.png?text=Calculator+Main+Page)
![Screenshot 2](https://via.placeholder.com/400x300.png?text=Result+Page)

## Contribution
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Create a pull request.

## License
This project is licensed under the [MIT License](LICENSE).
