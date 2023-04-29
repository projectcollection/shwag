import type { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { decrement, increment } from '../redux/slices/countSlice'
import { useGetPokemonByNameQuery, useSignUpUserMutation } from '../redux/services/auth'

export default function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');
    const [, { data: signupData }] = useSignUpUserMutation();

    useEffect(() => {
        console.log(signupData);
    }, [signupData]);

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
