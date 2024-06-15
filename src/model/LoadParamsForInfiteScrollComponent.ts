export default interface LoadParams {
    side: 'start' | 'end' | 'both';
    done: (status: 'loading' | 'error' | 'empty' | 'ok') => void;
}