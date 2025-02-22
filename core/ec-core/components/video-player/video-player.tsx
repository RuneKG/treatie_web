'use client';

import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import { BlockProps } from '~/ec-core/types/blockProps';
import { BlockTypes, PropertiesToModel } from '~/umbraco';
import { VideoPlayerPropertiesModel } from '~/umbracoClient';

import Container from '../container';

const VideoPlayerSettings = {
  Controls: 'Controls',
  Muted: 'Start with sound',
  Loop: 'Loop',
  Light: 'Use full default player',
};

export function VideoPlayer({ item }: BlockProps) {
  // This is setup to prevent hydration errors. Only runs on client side
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const properties = PropertiesToModel<VideoPlayerPropertiesModel>(
    BlockTypes.VideoPlayer,
    item.content,
  );

  if (!properties) {
    return null;
  }

  if (!properties.videoUrl) {
    return null;
  }

  return (
    <Container>
      <div className="aspect-video pb-12">
        {isClient && (
          <ReactPlayer
            controls={properties.settings?.includes(VideoPlayerSettings.Controls)}
            height="100%"
            light={properties.settings?.includes(VideoPlayerSettings.Light)}
            loop={properties.settings?.includes(VideoPlayerSettings.Loop)}
            muted={properties.settings?.includes(VideoPlayerSettings.Muted)}
            url={properties.videoUrl}
            width="100%"
          />
        )}
      </div>
    </Container>
  );
}
