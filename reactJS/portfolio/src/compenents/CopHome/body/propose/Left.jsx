import React from 'react'

function Left({ title, content, source }) {
    return (
        <div className='flex flex-col md:flex-row items-center gap-8 p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <div className='md:w-1/2'>
                <img
                    src={source}
                    alt="Illustration"
                    className='w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105'
                />
            </div>
            <div className='md:w-1/2 space-y-4'>
                <h1 className='text-3xl font-bold text-gray-800'>{title}</h1>
                <p className='text-lg text-gray-600 leading-relaxed'>{content}</p>
                <button className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300'>
                    En savoir plus →
                </button>
            </div>
        </div>
    )
}

export default Left;