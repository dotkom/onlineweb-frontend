import { DateTime } from 'luxon';

import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit';
import { getArticle, getArticles } from 'articles/api';
import { IArticle } from 'articles/models/Article';
import { State } from 'core/redux/Store';

const articlesAdapter = createEntityAdapter<IArticle>({
  sortComparer: (articleA, articleB) => {
    return Number(DateTime.fromISO(articleA.published_date) > DateTime.fromISO(articleB.published_date));
  },
});

export const articleSelectors = articlesAdapter.getSelectors<State>((state) => state.articles);

export const fetchArticlesList = createAsyncThunk('articles/fetchList', async () => {
  const articles = await getArticles();
  return articles;
});

export const fetchArticleById = createAsyncThunk('articles/fetchById', async (articleId: number) => {
  const articles = await getArticle(articleId);
  return articles;
});

export const fetchRelatedArticles = createAsyncThunk(
  'articles/fetchRelated',
  async (articleId: number, { getState }) => {
    const state = getState() as State;
    const mainArticle = articleSelectors.selectById(state, articleId);
    if (mainArticle) {
      const relatedArticles = await Promise.all(mainArticle.tags.map((tag) => getArticles({ tags: tag })));
      return relatedArticles.flat();
    }
    return [];
  }
);

export const fetchFrontPageArticles = createAsyncThunk('articles/fetchFrontPage', async () => {
  const articles = await getArticles({ page_size: 4 });
  return articles;
});

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, IArticle>;
  frontPageArticleIds: number[];
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
  frontPageArticleIds: [],
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState: articlesAdapter.getInitialState(INITIAL_STATE),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticlesList.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchArticlesList.fulfilled, (state, action) => {
      state.loading = 'idle';
      articlesAdapter.addMany(state, action.payload);
    });
    builder.addCase(fetchArticlesList.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
    builder.addCase(fetchArticleById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchArticleById.fulfilled, (state, action) => {
      state.loading = 'idle';
      articlesAdapter.addOne(state, action.payload);
    });
    builder.addCase(fetchArticleById.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
    builder.addCase(fetchRelatedArticles.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchRelatedArticles.fulfilled, (state, action) => {
      state.loading = 'idle';
      articlesAdapter.addMany(state, action.payload);
    });
    builder.addCase(fetchRelatedArticles.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
    builder.addCase(fetchFrontPageArticles.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchFrontPageArticles.fulfilled, (state, action) => {
      state.loading = 'idle';
      const articles = action.payload;
      const articleIds = articles.map((article) => article.id);
      state.frontPageArticleIds = articleIds;
      articlesAdapter.addMany(state, action.payload);
    });
    builder.addCase(fetchFrontPageArticles.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
  },
});

export const articlesReducer = articlesSlice.reducer;
