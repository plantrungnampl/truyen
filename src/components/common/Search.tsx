'use client'

import {useState, useCallback} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import {useDebouncedCallback} from 'use-debounce'

export default function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)

        if (term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }

        // Chỉ cập nhật URL, không chuyển trang
        router.replace(`?${params.toString()}`)
    }, 300)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            // Chuyển đến trang kết quả tìm kiếm
            router.push(`/searchresult?query=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        handleSearch(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md">
            <div className="flex">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={onChange}
                    placeholder="Tìm kiếm..."
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-6 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Tìm
                </button>
            </div>
        </form>
    )
}
