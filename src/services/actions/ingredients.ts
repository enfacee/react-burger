import { createAsyncThunk } from '@reduxjs/toolkit'
import { getIngredients as getIngredientsApi } from '../api'
import { TIngredientResponse } from '../../types/response'

export const getIngredients = createAsyncThunk<Array<TIngredientResponse>>(
    'ingredients/getIngredients',
    async () => {
      const response = await getIngredientsApi()
      return response.data
    },
)