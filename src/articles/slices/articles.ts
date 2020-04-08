import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit';
import { getArticle, getArticles } from 'articles/api';
import { IArticle } from 'articles/models/Article';
import { State } from 'core/redux/Store';

export const fetchArticlesList = createAsyncThunk('articles/fetchList', async () => {
  const articles = await getArticles();
  return articles;
});

export const fetchArticleById = createAsyncThunk('articles/fetchById', async (articleId: number) => {
  const articles = await getArticle(articleId);
  return articles;
});

const articlesAdapter = createEntityAdapter<IArticle>();

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: IArticle[];
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: [],
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState: articlesAdapter.getInitialState(INITIAL_STATE),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticlesList.pending, (state) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });
    builder.addCase(fetchArticlesList.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        articlesAdapter.addMany(state, action.payload);
      }
    });
    builder.addCase(fetchArticlesList.rejected, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.error;
      }
    });
    builder.addCase(fetchArticleById.pending, (state) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });
    builder.addCase(fetchArticleById.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        articlesAdapter.addOne(state, action.payload);
      }
    });
    builder.addCase(fetchArticleById.rejected, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.error;
      }
    });
  },
});

export const articleSelectors = articlesAdapter.getSelectors<State>((state) => state.articles);

export const articlesReducer = articlesSlice.reducer;
