export function KatalogForm() {
  return (
    <form name="katalog" method="POST" data-netlify="true">
      <div className="mt-8 max-w-md">
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="text-gray-700">Beställt antal kataloger</span>
            <input
              type="text"
              name="antal"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Namn</span>
            <input
              type="text"
              name="namn"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Ange för- och efternamn"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Adress</span>
            <input
              type="text"
              name="adress1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Adress</span>
            <input
              type="text"
              name="adress2"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
          </label>
          <div className="flex">
            <label className="block">
              <span className="text-gray-700">Postnummer</span>
              <input
                type="text"
                name="postnummer"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder=""
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Ort</span>
              <input
                type="text"
                name="postort"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder=""
              />
            </label>
          </div>
          <label className="block">
            <span className="text-gray-700">E-postadress</span>
            <input
              type="epostadress"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="namn@exempel.se"
            />
          </label>
          <p>
            <button type="submit">Send</button>
          </p>
        </div>
      </div>
    </form>
  )
}
