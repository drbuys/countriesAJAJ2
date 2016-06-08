var Map = function(latLng, zoom) {

    this.googleMap = new google.maps.Map( document.getElementById('map'), {
        center: latLng,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        scrollwheel: false,
        zoom: zoom,
    });

    this.addInfoWindow = function( latLng, title ) {
        var infowindow = new google.maps.InfoWindow({
            content: title
        });

        var marker = this.addMarker( latLng, title );
        marker.addListener( 'click', function() {
            // toggleBounce(marker);
            infowindow.open(this.map, this);
        } );

    };

    this.addMarker = function( latLng, title ) {
        var marker = new google.maps.Marker( {
            position: latLng,
            map: this.googleMap,
            title: title,
            draggable: true,
            animation: google.maps.Animation.DROP
        });
        marker.addListener( 'mouseover', toggleBounce(marker));
        return marker;
    };

    var toggleBounce = function(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    };

    this.bindClick = function() {
        // google.maps.event.addListener( map, eventType, callback );
        google.maps.event.addListener( this.googleMap, 'click', function(event) {
            // console.log( event.latLng.lat() );
            // console.log( event.latLng.lng() );
            var randomLabel = Math.random().toString(36).slice(2);
            var latLng = {lat: event.latLng.lat(), lng: event.latLng.lng()};
            this.addMarker( latLng, randomLabel );
        }.bind(this) );
    };

    this.resetCenter = function( latLng ) {
        this.googleMap.panTo( latLng );
    };
};
