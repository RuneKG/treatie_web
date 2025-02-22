interface LinkIconProps {
  url?: string;
}

const LinkIcon: React.FC<LinkIconProps> = ({ url }) => {
  if (!url) return null;

  if (url.toLowerCase().includes('facebook')) {
    return (
      <svg className="size-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (url.toLowerCase().includes('instagram')) {
    return (
      <svg className="size-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <path
            d="M12 16a4 4 0 1 0 0-8a4 4 0 0 0 0 8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M3 16V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z" />
          <path d="m17.5 6.51l.01-.011" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    );
  }

  if (url.toLowerCase().includes('linkedin')) {
    return (
      <svg className="size-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        >
          <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5M7 17v-7" />
          <path d="M11 17v-3.25M11 10v3.75m0 0c0-3.75 6-3.75 6 0V17M7 7.01l.01-.011" />
        </g>
      </svg>
    );
  }

  if (url.toLowerCase().includes('mastodon')) {
    return (
      <svg className="size-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        >
          <path d="M7 13.5V9c0-3 5-3 5 0v3m5 1.5V9c0-3-5-3-5 0v3" />
          <path d="M8 17c7.5 1 13 0 13-4V9c0-5.5-4-6.5-6-6.5H9c-3 0-6.067 1-5.863 6.5c.074 1.987.036 4.385.363 7c1 8 10.5 5.5 12 5v-1.5S7.5 21 8 17" />
        </g>
      </svg>
    );
  }

  if (url.toLowerCase().includes('threads')) {
    return (
      <svg className="size-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.914 8.128c2.505-2.014 6.11-.94 6.536 2.372c.452 3.514-.45 6.3-3.95 6.3c-3.25 0-3.15-2.8-3.15-2.8c0-3 5.15-3.4 8.15-1.9C23 15.6 19 22 13 22c-4.97 0-9-2.5-9-10S8.03 2 13 2c3.508 0 6.672 1.807 7.835 5.42"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (url.toLowerCase().includes('tiktok')) {
    return (
      <svg className="size-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        >
          <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5" />
          <path d="M10 12a3 3 0 1 0 3 3V6c.333 1 1.6 3 4 3" />
        </g>
      </svg>
    );
  }

  if (url.toLowerCase().includes('x.com')) {
    return (
      <svg className="size-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16.82 20.768L3.753 3.968A.6.6 0 0 1 4.227 3h2.48a.6.6 0 0 1 .473.232l13.067 16.8a.6.6 0 0 1-.474.968h-2.48a.6.6 0 0 1-.473-.232Z" />
          <path d="M20 3L4 21" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  if (url.toLowerCase().includes('youtube')) {
    return (
      <svg className="size-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <path
            d="m14 12l-3.5 2v-4z"
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M2 12.708v-1.416c0-2.895 0-4.343.905-5.274c.906-.932 2.332-.972 5.183-1.053C9.438 4.927 10.818 4.9 12 4.9s2.561.027 3.912.065c2.851.081 4.277.121 5.182 1.053S22 8.398 22 11.292v1.415c0 2.896 0 4.343-.905 5.275c-.906.931-2.331.972-5.183 1.052c-1.35.039-2.73.066-3.912.066s-2.561-.027-3.912-.066c-2.851-.08-4.277-.12-5.183-1.052S2 15.602 2 12.708Z" />
        </g>
      </svg>
    );
  }

  if (url.toLowerCase().includes('www.')) {
    const domain = url.split('www.')[1]?.split('.')[0];

    return (
      <div>
        {domain?.[0]?.toUpperCase()}
        {domain?.slice(1)}
      </div>
    );
  }

  return (
    <div>
      {url[0]?.toUpperCase()}
      {url.slice(1)}
    </div>
  );
};

export default LinkIcon;
