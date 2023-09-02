export interface Cocktail {
    idDrink: string
    strDrink: string
    strInstructions: string
    strDrinkThumb: string
    [propName: string]: string
}

export type CocktailsResponse = { drinks: Cocktail[] | null }

export type MetaTitle = string | undefined
