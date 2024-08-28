import React from 'react';

const NoAccess = () => (

  <section class="flex items-center h-screen p-16 bg-gray-50 dark:bg-gray-700">
  <div class="container flex flex-col items-center ">
      <div class="flex flex-col gap-6 max-w-md text-center">
          <h2 class="font-extrabold text-4xl text-gray-300">
          Erişim Reddedildi
          </h2>
          <p class="text-2xl md:text-3xl dark:text-gray-400">Bu sayfayı görüntülemek için yeterli izniniz yok.</p>
          <a href="http://localhost:3000/Admin" class="px-8 py-4 text-xl font-semibold rounded bg-purple-600 text-gray-50 hover:text-gray-200">Anasayfaya Dön</a>
      </div>
  </div>
</section>
);

export default NoAccess;
