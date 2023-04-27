import type { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'

import { decrement, increment } from '../redux/slices/countSlice'
import { useGetPokemonByNameQuery } from '../redux/services/auth'

export default function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');

    return (
        <div>
            {data && `pokeboi: ${data?.abilities[0].ability.name}`}
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
}
