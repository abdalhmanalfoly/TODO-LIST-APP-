import TodoForm from './components/TodoForm';

export default function Home() {
  return (
    <div className='px-4 py-5 flex flex-col gap-8 justify-center items-center bg-gradient-to-r from-orange-800 to-gray-950 min-h-screen'>
        <TodoForm />
    </div>
  );
}
