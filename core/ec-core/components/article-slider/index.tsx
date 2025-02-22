import { BlockTypes, PropertiesToModel } from '~/umbraco';
import {
  ApiBlockGridItemModel,
  ApiBlockItemModel,
  ArticleSliderPropertiesModel,
} from '~/umbracoClient';

import { Carousel } from '../carousel';
import Container from '../container';

import ArticleCard from './articleCard';

interface Props {
  item: ApiBlockItemModel | ApiBlockGridItemModel;
}

export default function ArticleSlider({ item }: Props) {
  const properties = PropertiesToModel<ArticleSliderPropertiesModel>(
    BlockTypes.ArticleSlider,
    item.content,
  );

  if (!properties) {
    return null;
  }

  const articles =
    properties.articles?.map((article, index) => <ArticleCard article={article} key={index} />) ??
    [];

  return (
    <Container>
      <Carousel products={articles} title="test" />
    </Container>
  );
}
