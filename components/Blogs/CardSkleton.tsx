import React from 'react'

function CardSkleton() {
    return (
        <div className="overflow-hidden shadow-lg bg-gray-200  dark:bg-gray-700 rounded-lg">
            <div className="animate-pulse">
                <div className="h-48 bg-gray-400"></div>
                <div className="px-6 py-4">
                    <div className="h-4 w-20 bg-gray-300 mb-2"></div>
                    <div className="h-6 w-32 bg-gray-300 mb-4"></div>
                    <div className="h-24 bg-gray-300"></div>
                </div>
            </div>
        </div>
    )
}

export default CardSkleton