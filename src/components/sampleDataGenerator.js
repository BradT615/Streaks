// sampleDataGenerator.js
export function generateSampleData() {
    // Define sample habits
    const sampleHabits = [
      { name: 'Exercise', order: 0 },
      { name: 'Read a book', order: 1 },
      { name: 'Meditate', order: 2 },
    ];
  
    // Create sample data object
    const sampleData = {};
    sampleHabits.forEach((habit, index) => {
      sampleData[`habit${index + 1}`] = {
        name: habit.name,
        order: habit.order,
      };
    });
  
    return sampleData;
}