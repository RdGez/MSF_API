import { AppDataSource } from '../config/db.config'
import Exercise from '../models/Exercise.entity'

const seedExercises = [
  { name: 'Bench Press', category: 'Chest' },
  { name: 'Incline Bench Press', category: 'Chest' },
  { name: 'Incline Dumbbell Press', category: 'Chest' },
  { name: 'Squat', category: 'Legs' },
  { name: 'Deadlift', category: 'Legs' },
  { name: 'Hack Squat', category: 'Legs' },
  { name: 'Cuadriseps Extension', category: 'Legs' },
  { name: 'Bulgarian Split Squat', category: 'Legs' },
  { name: 'Barbell Curl Bisep', category: 'Bisep' },
  { name: 'French Press', category: 'Trisep' },
  { name: 'Extensions with Rope', category: 'Trisep' },
  { name: 'Extensions with Bar', category: 'Trisep' },
  { name: 'Barbell Rowing', category: 'Back' },
  { name: 'Rowing at Chest', category: 'Back' },
]

export const seedDB = async () => {
  try {
    await AppDataSource.initialize()
    const hasExercises = await Exercise.find()
    if (hasExercises.length <= 0) {
      await AppDataSource
        .getRepository(Exercise)
        .createQueryBuilder()
        .delete()
        .execute()

      await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Exercise)
        .values(seedExercises)
        .execute()
    }

    console.log('Seed executed successfully ✅')
  } catch (error) {
    console.log(error)
    throw new Error(`Seed can't executed successfully! ❌`)
  }
}
