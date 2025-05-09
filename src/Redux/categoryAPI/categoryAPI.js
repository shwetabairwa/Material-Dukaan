export async function fetchMainCategories() {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/maincategory/getMainCategory`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return await response.json();
}

export async function fetchSubCategories() {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/subCategory/getSubCategory`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch subcategories");
  }
  return await response.json();
}

export async function fetchShopCategories() {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/shopcategory/getShopCategory`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch shop categories");
  }
  return await response.json();
}
export async function fetchProductCategories() {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/products/getProduct`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products categories");
  }
  return await response.json();
}


export async function fetchLoginData() {
 
  const response = await fetch(
    "https://partnerappbackend-production.up.railway.app/auth/verify",
    {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlNTIxYmY1ZjdhNDAwOGMzYmQ3MjFmMzk2OTcwOWI1MzY0MzA5NjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGFydG5lci1hcHAtNzk1OGEiLCJhdWQiOiJwYXJ0bmVyLWFwcC03OTU4YSIsImF1dGhfdGltZSI6MTcyNDY4MDUyNCwidXNlcl9pZCI6ImhOQjF5REtXWnphTHlTa3BDOXRPaDlkR0c5QTMiLCJzdWIiOiJoTkIxeURLV1p6YUx5U2twQzl0T2g5ZEdHOUEzIiwiaWF0IjoxNzMxNTU5MTcyLCJleHAiOjE3MzE1NjI3NzIsInBob25lX251bWJlciI6Iis5MTExMTExMTExMTEiLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7InBob25lIjpbIis5MTExMTExMTExMTEiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.JexsgoG3hsB-p6HPsp71WVbdy-GqdEDbMY3tScg2uD20DNX23yf0kTw2QIcx8jD5cdVnVHbOZ0R7-cdwIAkNMGhVIYnFRIGi8jLk3xA20Hg-XXYluqbISkYTDSuLraMcd3YDIehKP_79eZ533d_QpRZSVC1UAkjWDzuz3jbcB_TO4qRxp9GG8FgwVbEthzp0NYrGI_jZmxcgyd2b3GzXIrXUBeVE0LGS5Z4x-wClKbTh8Od98ceWqZoQXPBAKsAirrLWbXdwpI3Q4CMDXxtdK6CW7DVETTxH6cIXjEQwmTRp0EpgpWINqrY0synbIW-WBCBVblmqGDqFBaq00iuHew",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch login data");
  }

  return await response.json();
}
