import { createAsyncThunk } from '@reduxjs/toolkit'
import { getIngredients as getIngredientsApi } from '../api'

export const getIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async () => {
      const response = await getIngredientsApi()
      return response.data
    },
)